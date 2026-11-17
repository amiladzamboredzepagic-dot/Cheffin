import unittest
from datetime import datetime, timezone
from types import SimpleNamespace
from unittest.mock import patch

from bson import ObjectId

from app.graphql.schema import schema


class FakeCursor:
    def __init__(self, documents: list[dict]) -> None:
        self.documents = documents

    def sort(self, key: str, direction: int = 1) -> "FakeCursor":
        self.documents.sort(
            key=lambda document: document[key],
            reverse=direction < 0,
        )
        return self

    def __aiter__(self):
        return self._iterate()

    async def _iterate(self):
        for document in self.documents:
            yield document


class FakeCollection:
    def __init__(self, documents: list[dict] | None = None) -> None:
        self.documents = documents or []

    def find(self, query: dict) -> FakeCursor:
        return FakeCursor(
            [
                document
                for document in self.documents
                if all(document.get(key) == value for key, value in query.items())
            ]
        )

    async def find_one(self, query: dict) -> dict | None:
        return next(
            (
                document
                for document in self.documents
                if all(document.get(key) == value for key, value in query.items())
            ),
            None,
        )

    async def update_one(
        self, query: dict, update: dict, upsert: bool = False
    ) -> SimpleNamespace:
        document = await self.find_one(query)
        if document is None:
            if not upsert:
                return SimpleNamespace(matched_count=0, upserted_id=None)
            document = {"_id": ObjectId(), **update.get("$setOnInsert", {})}
            self.documents.append(document)
        document.update(update.get("$setOnInsert", {}))
        document.update(update.get("$set", {}))
        return SimpleNamespace(matched_count=1, upserted_id=None)

    async def delete_one(self, query: dict) -> SimpleNamespace:
        document = await self.find_one(query)
        if document is None:
            return SimpleNamespace(deleted_count=0)
        self.documents.remove(document)
        return SimpleNamespace(deleted_count=1)


class FakeDatabase:
    def __init__(self, recipe: dict, collection: dict) -> None:
        self.recipes = FakeCollection([recipe])
        self.collections = FakeCollection([collection])
        self.saved_recipes = FakeCollection()

    def __getitem__(self, collection_name: str) -> FakeCollection:
        return getattr(self, collection_name)


class SavedRecipeMutationTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self) -> None:
        self.recipe_id = ObjectId()
        self.collection_id = ObjectId()
        self.recipe = {
            "_id": self.recipe_id,
            "title": "Tomato soup",
            "description": "A simple soup.",
            "ingredients": ["Tomatoes"],
            "steps": ["Cook the tomatoes."],
            "prep_time_minutes": 20,
            "servings": 2,
            "meal_type": "lunch",
            "dietary_preferences": [],
            "cuisine": "italian",
            "difficulty": "easy",
            "photo": None,
            "is_private": False,
        }
        self.collection = {
            "_id": self.collection_id,
            "owner_id": "user-1",
            "name": "Favorites",
        }
        self.database = FakeDatabase(self.recipe, self.collection)

    async def test_save_and_list_public_recipe_in_collection(self) -> None:
        mutation = """
            mutation SavePublicRecipe($recipeId: String!, $collectionId: String) {
              savePublicRecipe(recipeId: $recipeId, collectionId: $collectionId)
            }
        """
        query = """
            {
              mySavedRecipes {
                id
                title
                collectionId
                ingredients
                steps
              }
            }
        """

        with patch("app.recipes.schema.get_database", return_value=self.database):
            saved = await schema.execute(
                mutation,
                variable_values={
                    "recipeId": str(self.recipe_id),
                    "collectionId": str(self.collection_id),
                },
                context_value=SimpleNamespace(user={"sub": "user-1"}),
            )
            listed = await schema.execute(
                query,
                context_value=SimpleNamespace(user={"sub": "user-1"}),
            )

        self.assertIsNone(saved.errors)
        self.assertIs(saved.data["savePublicRecipe"], True)
        self.assertIsNone(listed.errors)
        self.assertEqual(
            listed.data["mySavedRecipes"],
            [
                {
                    "id": str(self.recipe_id),
                    "title": "Tomato soup",
                    "collectionId": str(self.collection_id),
                    "ingredients": ["Tomatoes"],
                    "steps": ["Cook the tomatoes."],
                }
            ],
        )
        self.assertEqual(len(self.database.saved_recipes.documents), 1)

    async def test_save_without_collection_is_idempotent(self) -> None:
        mutation = """
            mutation SavePublicRecipe($recipeId: String!) {
              savePublicRecipe(recipeId: $recipeId)
            }
        """
        with patch("app.recipes.schema.get_database", return_value=self.database):
            for _ in range(2):
                result = await schema.execute(
                    mutation,
                    variable_values={"recipeId": str(self.recipe_id)},
                    context_value=SimpleNamespace(user={"sub": "user-1"}),
                )

        self.assertIsNone(result.errors)
        self.assertEqual(len(self.database.saved_recipes.documents), 1)
        self.assertIsNone(
            self.database.saved_recipes.documents[0]["collection_id"]
        )

    async def test_rejects_private_recipes_and_other_users_collections(self) -> None:
        self.recipe["is_private"] = True
        mutation = """
            mutation SavePublicRecipe($recipeId: String!, $collectionId: String) {
              savePublicRecipe(recipeId: $recipeId, collectionId: $collectionId)
            }
        """
        with patch("app.recipes.schema.get_database", return_value=self.database):
            private_recipe = await schema.execute(
                mutation,
                variable_values={"recipeId": str(self.recipe_id)},
                context_value=SimpleNamespace(user={"sub": "user-1"}),
            )
            self.recipe["is_private"] = False
            other_collection = await schema.execute(
                mutation,
                variable_values={
                    "recipeId": str(self.recipe_id),
                    "collectionId": str(ObjectId()),
                },
                context_value=SimpleNamespace(user={"sub": "user-1"}),
            )

        self.assertIsNotNone(private_recipe.errors)
        self.assertEqual(
            private_recipe.errors[0].extensions["code"],
            "NOT_FOUND",
        )
        self.assertIsNotNone(other_collection.errors)
        self.assertEqual(
            other_collection.errors[0].extensions["code"],
            "BAD_USER_INPUT",
        )
        self.assertEqual(self.database.saved_recipes.documents, [])

    async def test_remove_saved_recipe_is_owner_scoped(self) -> None:
        self.database.saved_recipes.documents.append(
            {
                "_id": ObjectId(),
                "owner_id": "user-2",
                "recipe_id": self.recipe_id,
                "collection_id": None,
                "saved_at": datetime.now(timezone.utc),
            }
        )
        self.database.saved_recipes.documents.append(
            {
                "_id": ObjectId(),
                "owner_id": "user-1",
                "recipe_id": self.recipe_id,
                "collection_id": None,
                "saved_at": datetime.now(timezone.utc),
            }
        )
        mutation = """
            mutation RemoveSavedRecipe($recipeId: String!) {
              removeSavedRecipe(recipeId: $recipeId)
            }
        """
        with patch("app.recipes.schema.get_database", return_value=self.database):
            result = await schema.execute(
                mutation,
                variable_values={"recipeId": str(self.recipe_id)},
                context_value=SimpleNamespace(user={"sub": "user-1"}),
            )

        self.assertIsNone(result.errors)
        self.assertIs(result.data["removeSavedRecipe"], True)
        self.assertEqual(len(self.database.saved_recipes.documents), 1)
        self.assertEqual(
            self.database.saved_recipes.documents[0]["owner_id"],
            "user-2",
        )


if __name__ == "__main__":
    unittest.main()
