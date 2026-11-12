import unittest
from types import SimpleNamespace
from unittest.mock import patch

from bson import ObjectId

from app.graphql.schema import schema


class FakeRecipeCollection:
    def __init__(self) -> None:
        self.document: dict | None = None

    async def insert_one(self, document: dict) -> SimpleNamespace:
        self.document = document
        return SimpleNamespace(inserted_id=ObjectId())


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

        self.assertIsNone(result.errors)
        self.assertEqual(result.data["createRecipe"]["title"], "Tomato soup")
        self.assertTrue(result.data["createRecipe"]["isPrivate"])
        self.assertEqual(database.recipes.document["owner_id"], "user-123")
        self.assertTrue(database.recipes.document["is_private"])
        self.assertIsNone(database.recipes.document["collection_id"])


if __name__ == "__main__":
    unittest.main()
