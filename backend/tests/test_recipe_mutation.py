import unittest
from base64 import b64encode
from datetime import datetime, timezone
from types import SimpleNamespace
from unittest.mock import patch

from bson import ObjectId

from app.graphql.schema import schema


class FakeRecipeCollection:
    def __init__(self) -> None:
        self.document: dict | None = None
        self.documents: list[dict] = []

    async def insert_one(self, document: dict) -> SimpleNamespace:
        self.document = document
        inserted_id = ObjectId()
        self.documents.append({**document, "_id": inserted_id})
        return SimpleNamespace(inserted_id=inserted_id)

    def find(self, query: dict) -> "FakeRecipeCursor":
        return FakeRecipeCursor(
            [
                document
                for document in self.documents
                if all(document.get(key) == value for key, value in query.items())
            ]
        )


class FakeRecipeCursor:
    def __init__(self, documents: list[dict]) -> None:
        self.documents = documents

    def sort(self, key: str, direction: int) -> "FakeRecipeCursor":
        self.documents.sort(key=lambda document: document[key], reverse=direction < 0)
        return self

    def __aiter__(self):
        return self._iterate()

    async def _iterate(self):
        for document in self.documents:
            yield document


class FakeDatabase:
    def __init__(self) -> None:
        self.recipes = FakeRecipeCollection()

    def __getitem__(self, collection_name: str) -> FakeRecipeCollection:
        if collection_name != "recipes":
            raise AssertionError(f"Unexpected collection: {collection_name}")
        return self.recipes


class CreateRecipeMutationTests(unittest.IsolatedAsyncioTestCase):
    async def test_saves_recipe_as_private_to_authenticated_user(self) -> None:
        database = FakeDatabase()
        query = """
            mutation CreateRecipe($input: CreateRecipeInput!) {
              createRecipe(input: $input) {
                id
                title
                isPrivate
              }
            }
        """

        with patch("app.recipes.schema.get_database", return_value=database):
            result = await schema.execute(
                query,
                variable_values={
                    "input": {
                        "title": "Tomato soup",
                        "description": "",
                        "ingredients": ["2 tomatoes"],
                        "steps": [],
                        "prepTimeMinutes": 20,
                        "servings": 2,
                        "mealType": "lunch",
                    }
                },
                context_value=SimpleNamespace(user={"sub": "user-123"}),
            )
            listed = await schema.execute(
                "{ myRecipes { id title } }",
                context_value=SimpleNamespace(user={"sub": "user-123"}),
            )

        self.assertIsNone(result.errors)
        self.assertEqual(result.data["createRecipe"]["title"], "Tomato soup")
        self.assertTrue(result.data["createRecipe"]["isPrivate"])
        self.assertEqual(database.recipes.document["owner_id"], "user-123")
        self.assertTrue(database.recipes.document["is_private"])
        self.assertIsNone(database.recipes.document["collection_id"])
        self.assertIsNone(listed.errors)
        self.assertEqual(listed.data["myRecipes"][0]["id"], result.data["createRecipe"]["id"])

    async def test_lists_only_current_users_recipes_newest_first(self) -> None:
        database = FakeDatabase()
        photo = b"\x89PNG\r\n\x1a\nexample"
        database.recipes.documents = [
            {
                "_id": ObjectId(),
                "owner_id": owner,
                "title": title,
                "description": "",
                "prep_time_minutes": 20,
                "servings": 2,
                "photo": recipe_photo,
                "created_at": datetime(2026, 1, day, tzinfo=timezone.utc),
            }
            for owner, title, day, recipe_photo in [
                ("user-1", "Older", 1, None),
                ("user-2", "Private", 3, None),
                ("user-1", "Newer", 2, {"content_type": "image/png", "data": photo}),
            ]
        ]
        query = """
            { myRecipes {
                id title description prepTimeMinutes servings photoContentType photoBase64
            } }
        """

        with patch("app.recipes.schema.get_database", return_value=database):
            result = await schema.execute(
                query, context_value=SimpleNamespace(user={"sub": "user-1"})
            )
            unauthenticated = await schema.execute(
                query, context_value=SimpleNamespace(user=None)
            )
            empty = await schema.execute(
                query, context_value=SimpleNamespace(user={"sub": "user-3"})
            )

        self.assertIsNone(result.errors)
        recipes = result.data["myRecipes"]
        self.assertEqual([recipe["title"] for recipe in recipes], ["Newer", "Older"])
        self.assertEqual(recipes[0]["photoBase64"], b64encode(photo).decode("ascii"))
        self.assertEqual(recipes[0]["photoContentType"], "image/png")
        self.assertIsNone(recipes[1]["photoBase64"])
        self.assertIsNone(recipes[1]["photoContentType"])
        self.assertEqual(recipes[0]["prepTimeMinutes"], 20)
        self.assertEqual(recipes[0]["servings"], 2)
        self.assertIsNotNone(unauthenticated.errors)
        self.assertIsNone(empty.errors)
        self.assertEqual(empty.data["myRecipes"], [])


if __name__ == "__main__":
    unittest.main()
