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

    async def update_one(self, query: dict, update: dict) -> SimpleNamespace:
        for document in self.documents:
            if all(document.get(key) == value for key, value in query.items()):
                document.update(update["$set"])
                return SimpleNamespace(matched_count=1)
        return SimpleNamespace(matched_count=0)


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
    async def test_persists_and_returns_recipe_taxonomy(self) -> None:
        database = FakeDatabase()
        create = """
            mutation CreateRecipe($input: CreateRecipeInput!) {
              createRecipe(input: $input) {
                mealType
                dietaryPreferences
                cuisine
                difficulty
              }
            }
        """
        recipe_input = {
            "title": "Berry tart",
            "ingredients": ["berries"],
            "prepTimeMinutes": 40,
            "servings": 6,
            "mealType": "dessert",
            "dietaryPreferences": ["vegetarian", "glutenFree"],
            "cuisine": "mediterranean",
            "difficulty": "medium",
            "publish": True,
        }

        with patch("app.recipes.schema.get_database", return_value=database):
            created = await schema.execute(
                create,
                variable_values={"input": recipe_input},
                context_value=SimpleNamespace(user={"sub": "owner"}),
            )
            mine = await schema.execute(
                """
                { myRecipes {
                    dietaryPreferences cuisine difficulty
                } }
                """,
                context_value=SimpleNamespace(user={"sub": "owner"}),
            )
            public = await schema.execute(
                """
                { publicRecipes {
                    mealType dietaryPreferences cuisine difficulty
                } }
                """,
                context_value=SimpleNamespace(user=None),
            )

        self.assertIsNone(created.errors)
        self.assertEqual(
            created.data["createRecipe"],
            {
                "mealType": "dessert",
                "dietaryPreferences": ["vegetarian", "glutenFree"],
                "cuisine": "mediterranean",
                "difficulty": "medium",
            },
        )
        self.assertEqual(database.recipes.document["dietary_preferences"], ["vegetarian", "glutenFree"])
        self.assertEqual(database.recipes.document["cuisine"], "mediterranean")
        self.assertEqual(database.recipes.document["difficulty"], "medium")
        self.assertIsNone(mine.errors)
        self.assertEqual(
            mine.data["myRecipes"][0],
            {
                "dietaryPreferences": ["vegetarian", "glutenFree"],
                "cuisine": "mediterranean",
                "difficulty": "medium",
            },
        )
        self.assertIsNone(public.errors)
        self.assertEqual(
            public.data["publicRecipes"][0],
            {
                "mealType": "dessert",
                "dietaryPreferences": ["vegetarian", "glutenFree"],
                "cuisine": "mediterranean",
                "difficulty": "medium",
            },
        )

    async def test_publishing_is_owner_only_and_public_listing_excludes_drafts(self) -> None:
        database = FakeDatabase()
        create = """
            mutation Create($input: CreateRecipeInput!) {
              createRecipe(input: $input) { id isPrivate }
            }
        """
        publish = """
            mutation Publish($id: String!) { publishRecipe(recipeId: $id) }
        """
        recipe_input = {
            "title": "Tomato soup",
            "ingredients": ["2 tomatoes"],
            "steps": ["Cook"],
            "prepTimeMinutes": 20,
            "servings": 2,
            "mealType": "lunch",
        }
        with patch("app.recipes.schema.get_database", return_value=database):
            draft = await schema.execute(
                create, variable_values={"input": recipe_input},
                context_value=SimpleNamespace(user={"sub": "owner"}),
            )
            direct = await schema.execute(
                create, variable_values={"input": {**recipe_input, "publish": True}},
                context_value=SimpleNamespace(user={"sub": "other"}),
            )
            recipe_id = draft.data["createRecipe"]["id"]
            rejected = await schema.execute(
                publish, variable_values={"id": recipe_id},
                context_value=SimpleNamespace(user={"sub": "other"}),
            )
            anonymous = await schema.execute(
                publish, variable_values={"id": recipe_id},
                context_value=SimpleNamespace(user=None),
            )
            invalid = await schema.execute(
                publish, variable_values={"id": "invalid"},
                context_value=SimpleNamespace(user={"sub": "owner"}),
            )
            before = await schema.execute(
                "{ publicRecipes { id ingredients steps } }",
                context_value=SimpleNamespace(user=None),
            )
            published = await schema.execute(
                publish, variable_values={"id": recipe_id},
                context_value=SimpleNamespace(user={"sub": "owner"}),
            )
            after = await schema.execute(
                "{ publicRecipes { id ingredients steps } }",
                context_value=SimpleNamespace(user=None),
            )
            mine = await schema.execute(
                "{ myRecipes { id isPrivate } }",
                context_value=SimpleNamespace(user={"sub": "owner"}),
            )
            direct_mine = await schema.execute(
                "{ myRecipes { id isPrivate } }",
                context_value=SimpleNamespace(user={"sub": "other"}),
            )

        self.assertIsNone(draft.errors)
        self.assertTrue(draft.data["createRecipe"]["isPrivate"])
        self.assertIsNone(direct.errors)
        self.assertFalse(direct.data["createRecipe"]["isPrivate"])
        self.assertIsNotNone(rejected.errors)
        self.assertIsNotNone(anonymous.errors)
        self.assertIsNotNone(invalid.errors)
        self.assertIsNone(before.errors)
        self.assertEqual([item["id"] for item in before.data["publicRecipes"]], [direct.data["createRecipe"]["id"]])
        self.assertIsNone(published.errors)
        self.assertTrue(published.data["publishRecipe"])
        self.assertIsNone(after.errors)
        self.assertEqual(len(after.data["publicRecipes"]), 2)
        self.assertEqual(after.data["publicRecipes"][0]["ingredients"], ["2 tomatoes"])
        self.assertEqual(after.data["publicRecipes"][0]["steps"], ["Cook"])
        self.assertFalse(mine.data["myRecipes"][0]["isPrivate"])
        self.assertEqual(
            direct_mine.data["myRecipes"][0]["id"], direct.data["createRecipe"]["id"]
        )
        self.assertFalse(direct_mine.data["myRecipes"][0]["isPrivate"])

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
                id title description prepTimeMinutes servings dietaryPreferences cuisine difficulty photoContentType photoBase64 isPrivate collectionId
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
            public = await schema.execute(
                "{ publicRecipes { id } }", context_value=SimpleNamespace(user=None)
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
        self.assertEqual(recipes[0]["dietaryPreferences"], [])
        self.assertIsNone(recipes[0]["cuisine"])
        self.assertIsNone(recipes[0]["difficulty"])
        self.assertTrue(all(recipe["isPrivate"] for recipe in recipes))
        self.assertTrue(all(recipe["collectionId"] is None for recipe in recipes))
        self.assertIsNotNone(unauthenticated.errors)
        self.assertIsNone(empty.errors)
        self.assertEqual(empty.data["myRecipes"], [])
        self.assertIsNone(public.errors)
        self.assertEqual(public.data["publicRecipes"], [])


if __name__ == "__main__":
    unittest.main()
