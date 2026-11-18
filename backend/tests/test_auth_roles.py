import unittest
from types import SimpleNamespace
from unittest.mock import patch

from bson import ObjectId
from starlette.responses import Response

from app.api.auth_routes import create_auth_response, refresh_token


class FakeUsersCollection:
    def __init__(self, user: dict) -> None:
        self.user = user

    async def find_one(self, query: dict) -> dict | None:
        return self.user if self.user["_id"] == query["_id"] else None


class AuthRoleResponseTests(unittest.IsolatedAsyncioTestCase):
    def test_login_response_includes_account_role(self) -> None:
        user = {
            "_id": ObjectId(),
            "first_name": "Ava",
            "last_name": "Cook",
            "role": "admin",
        }
        request = SimpleNamespace(url=SimpleNamespace(scheme="https"))

        with (
            patch("app.api.auth_routes.create_access_token", return_value="access"),
            patch("app.api.auth_routes.create_refresh_token", return_value="refresh"),
        ):
            result = create_auth_response(user, request, Response())

        self.assertEqual(result["role"], "admin")

    async def test_refresh_returns_current_database_role(self) -> None:
        user_id = ObjectId()
        database_user = {
            "_id": user_id,
            "first_name": "Ava",
            "last_name": "Cook",
            "role": "admin",
        }
        database = {"users": FakeUsersCollection(database_user)}
        request = SimpleNamespace(cookies={"refresh_token": "refresh"})

        with (
            patch(
                "app.api.auth_routes.decode_refresh_token",
                return_value={"sub": str(user_id), "role": "chef"},
            ),
            patch(
                "app.api.auth_routes.create_access_token",
                return_value="new-access",
            ) as create_access_token,
        ):
            result = await refresh_token(request, database)

        self.assertEqual(result["role"], "admin")
        self.assertEqual(result["first_name"], "Ava")
        self.assertEqual(
            create_access_token.call_args.args[0]["role"],
            "admin",
        )


if __name__ == "__main__":
    unittest.main()
