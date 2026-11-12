import unittest
from types import SimpleNamespace
from unittest.mock import patch

from bson import ObjectId
from pymongo.errors import DuplicateKeyError

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


class FakeCollectionStore:
    def __init__(self) -> None:
        self.documents: list[dict] = []

    async def insert_one(self, document: dict) -> SimpleNamespace:
        duplicate = any(
            existing["owner_id"] == document["owner_id"]
            and existing["normalized_name"] == document["normalized_name"]
            for existing in self.documents
        )
        if duplicate:
            raise DuplicateKeyError("Duplicate collection name")

        stored_document = {**document, "_id": ObjectId()}
        self.documents.append(stored_document)
        return SimpleNamespace(inserted_id=stored_document["_id"])

    async def find_one(self, query: dict) -> dict | None:
        return next(
            (
                document
                for document in self.documents
                if all(document.get(key) == value for key, value in query.items())
            ),
            None,
        )

    def find(self, query: dict) -> FakeCursor:
        return FakeCursor(
            [
                document
                for document in self.documents
                if all(document.get(key) == value for key, value in query.items())
            ]
        )


class FakeRecipeStore:
    def __init__(self) -> None:
        self.documents: list[dict] = []

    async def insert_one(self, document: dict) -> SimpleNamespace:
        stored_document = {**document, "_id": ObjectId()}
        self.documents.append(stored_document)
        return SimpleNamespace(inserted_id=stored_document["_id"])


class FakeDatabase:
    def __init__(self) -> None:
        self.collections = FakeCollectionStore()
        self.recipes = FakeRecipeStore()

    def __getitem__(self, collection_name: str):
        return getattr(self, collection_name)


class CollectionMutationTests(unittest.IsolatedAsyncioTestCase):
    async def test_rejects_duplicate_collection_names_case_insensitively(self) -> None:
        database = FakeDatabase()
        mutation = """
            mutation CreateCollection($name: String!) {
              createCollection(name: $name) {
                id
              }
            }
        """

        with patch("app.recipes.schema.get_database", return_value=database):
            await schema.execute(
                mutation,
                variable_values={"name": "Weeknight meals"},
                context_value=SimpleNamespace(user={"sub": "user-1"}),
            )
            duplicate = await schema.execute(
                mutation,
                variable_values={"name": "  WEEKNIGHT MEALS "},
                context_value=SimpleNamespace(user={"sub": "user-1"}),
            )

        self.assertIsNotNone(duplicate.errors)
        self.assertEqual(
            duplicate.errors[0].extensions["code"],
            "COLLECTION_EXISTS",
        )

    async def test_create_and_list_collections_for_authenticated_user(self) -> None:
        database = FakeDatabase()
        user_collection = """
            mutation CreateCollection($name: String!) {
              createCollection(name: $name) {
                id
                name
              }
            }
        """
        with patch("app.recipes.schema.get_database", return_value=database):
            created = await schema.execute(
                user_collection,
                variable_values={"name": "  Weeknight meals  "},
                context_value=SimpleNamespace(user={"sub": "user-1"}),
            )
            database.collections.documents.append(
                {
                    "_id": ObjectId(),
                    "owner_id": "user-2",
                    "name": "Other user's collection",
                    "normalized_name": "other user's collection",
                }
            )
            listed = await schema.execute(
                "{ myCollections { id name } }",
                context_value=SimpleNamespace(user={"sub": "user-1"}),
            )

        self.assertIsNone(created.errors)
        self.assertEqual(created.data["createCollection"]["name"], "Weeknight meals")
        self.assertEqual(
            database.collections.documents[0]["normalized_name"],
            "weeknight meals",
        )
        self.assertIsNone(listed.errors)
        self.assertEqual(
            [item["name"] for item in listed.data["myCollections"]],
            ["Weeknight meals"],
        )

    async def test_recipe_can_only_be_assigned_to_owner_collection(self) -> None:
        database = FakeDatabase()
        own_collection_id = ObjectId()
        other_collection_id = ObjectId()
        database.collections.documents.extend(
            [
                {
                    "_id": own_collection_id,
                    "owner_id": "user-1",
                    "name": "My collection",
                },
                {
                    "_id": other_collection_id,
                    "owner_id": "user-2",
                    "name": "Not mine",
                },
            ]
        )
        mutation = """
            mutation CreateRecipe($input: CreateRecipeInput!) {
              createRecipe(input: $input) {
                id
                collectionId
              }
            }
        """
        input_data = {
            "title": "Tomato soup",
            "ingredients": ["2 tomatoes"],
            "prepTimeMinutes": 20,
            "servings": 2,
            "mealType": "lunch",
        }

        with patch("app.recipes.schema.get_database", return_value=database):
            created = await schema.execute(
                mutation,
                variable_values={
                    "input": {**input_data, "collectionId": str(own_collection_id)}
                },
                context_value=SimpleNamespace(user={"sub": "user-1"}),
            )
            rejected = await schema.execute(
                mutation,
                variable_values={
                    "input": {
                        **input_data,
                        "collectionId": str(other_collection_id),
                    }
                },
                context_value=SimpleNamespace(user={"sub": "user-1"}),
            )

        self.assertIsNone(created.errors)
        self.assertEqual(
            database.recipes.documents[0]["collection_id"],
            own_collection_id,
        )
        self.assertIsNotNone(rejected.errors)
        self.assertEqual(len(database.recipes.documents), 1)


if __name__ == "__main__":
    unittest.main()
