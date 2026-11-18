import unittest
from types import SimpleNamespace
from unittest.mock import patch

from bson import ObjectId

from app.graphql.schema import schema
from app.core.roles import ROLE_ADMIN, ROLE_CHEF


class FakeCursor:
    def __init__(self, documents: list[dict]) -> None:
        self.documents = documents

    def sort(self, fields: list[tuple[str, int]]) -> "FakeCursor":
        for field, direction in reversed(fields):
            self.documents.sort(
                key=lambda document: document.get(field, ""),
                reverse=direction < 0,
            )
        return self

    def __aiter__(self):
        return self._iterate()

    async def _iterate(self):
        for document in self.documents:
            yield document


class FakeCollection:
    def __init__(
        self,
        documents: list[dict] | None = None,
        aggregate_results: list[dict] | None = None,
    ) -> None:
        self.documents = documents or []
        self.aggregate_results = aggregate_results or []
        self.projection: dict | None = None

    def find(self, query: dict, projection: dict) -> FakeCursor:
        self.projection = projection
        return FakeCursor(self.documents.copy())

    def aggregate(self, _pipeline: list[dict]) -> FakeCursor:
        return FakeCursor(self.aggregate_results.copy())

    async def count_documents(self, query: dict) -> int:
        if not query:
            return len(self.documents)

        key, expected = next(iter(query.items()))
        if isinstance(expected, dict) and "$ne" in expected:
            return sum(
                document.get(key) != expected["$ne"]
                for document in self.documents
            )
        return sum(document.get(key) == expected for document in self.documents)


class FakeDatabase:
    def __init__(self) -> None:
        self.collections = {
            "users": FakeCollection(
                [
                    {
                        "_id": ObjectId("000000000000000000000001"),
                        "first_name": "Ava",
                        "last_name": "Cook",
                        "email": "ava@example.com",
                        "password": "must-not-be-selected",
                    }
                ]
            ),
            "recipes": FakeCollection(
                documents=[
                    {"is_private": False},
                    {"is_private": True},
                    {},
                ],
                aggregate_results=[
                    {
                        "_id": "000000000000000000000001",
                        "recipe_count": 2,
                        "published_recipe_count": 1,
                        "draft_recipe_count": 1,
                    }
                ],
            ),
            "collections": FakeCollection(
                documents=[{}, {}],
                aggregate_results=[
                    {
                        "_id": "000000000000000000000001",
                        "collection_count": 2,
                    }
                ],
            ),
            "saved_recipes": FakeCollection(documents=[{}, {}, {}, {}]),
        }

    def __getitem__(self, name: str) -> FakeCollection:
        return self.collections[name]


class AdminDashboardTests(unittest.IsolatedAsyncioTestCase):
    async def test_dashboard_requires_admin_role(self) -> None:
        for user in (None, {"sub": "regular-user", "role": ROLE_CHEF}):
            result = await schema.execute(
                "{ adminDashboardStats { totalUsers } }",
                context_value=SimpleNamespace(user=user),
            )
            self.assertIsNotNone(result.errors)

    async def test_admin_dashboard_returns_aggregate_statistics(self) -> None:
        database = FakeDatabase()
        query = """
            {
              adminDashboardStats {
                totalUsers
                totalRecipes
                publishedRecipes
                draftRecipes
                totalCollections
                totalSavedRecipes
                users {
                  id
                  firstName
                  lastName
                  email
                  recipeCount
                  publishedRecipeCount
                  draftRecipeCount
                  collectionCount
                }
              }
            }
        """

        with patch("app.graphql.schema.get_database", return_value=database):
            result = await schema.execute(
                query,
                context_value=SimpleNamespace(
                    user={"sub": "admin-user", "role": ROLE_ADMIN}
                ),
            )

        self.assertIsNone(result.errors)
        self.assertEqual(
            result.data["adminDashboardStats"],
            {
                "totalUsers": 1,
                "totalRecipes": 3,
                "publishedRecipes": 1,
                "draftRecipes": 2,
                "totalCollections": 2,
                "totalSavedRecipes": 4,
                "users": [
                    {
                        "id": "000000000000000000000001",
                        "firstName": "Ava",
                        "lastName": "Cook",
                        "email": "ava@example.com",
                        "recipeCount": 2,
                        "publishedRecipeCount": 1,
                        "draftRecipeCount": 1,
                        "collectionCount": 2,
                    }
                ],
            },
        )
        self.assertEqual(database["users"].projection, {"password": 0})


if __name__ == "__main__":
    unittest.main()
