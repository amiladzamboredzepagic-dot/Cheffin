import unittest
from types import SimpleNamespace
from unittest.mock import patch

from bson import ObjectId
from fastapi import HTTPException
from starlette.responses import Response

from app.api.auth_routes import (
    ProfileNameUpdate,
    create_auth_response,
    refresh_token,
    update_profile_names,
)
from app.core.roles import ROLE_ADMIN, ROLE_CHEF


class FakeUsersCollection:
    def __init__(self, user: dict) -> None:
        self.user = user

    async def find_one(self, query: dict) -> dict | None:
        return self.user if self.user["_id"] == query["_id"] else None

    async def update_one(self, query: dict, update: dict) -> SimpleNamespace:
        if self.user["_id"] == query["_id"]:
            self.user.update(update["$set"])
            return SimpleNamespace(matched_count=1)
        return SimpleNamespace(matched_count=0)


class AuthRoleResponseTests(unittest.IsolatedAsyncioTestCase):
    def test_missing_role_defaults_to_chef(self) -> None:
        user = {
            "_id": ObjectId(),
            "first_name": "Ava",
            "last_name": "Cook",
        }
        request = SimpleNamespace(url=SimpleNamespace(scheme="https"))

        with (
            patch("app.api.auth_routes.create_access_token", return_value="access"),
            patch("app.api.auth_routes.create_refresh_token", return_value="refresh"),
        ):
            result = create_auth_response(user, request, Response())

        self.assertEqual(result["role"], ROLE_CHEF)

    def test_login_response_includes_account_role(self) -> None:
        user = {
            "_id": ObjectId(),
            "first_name": "Ava",
            "last_name": "Cook",
            "role": ROLE_ADMIN,
        }
        request = SimpleNamespace(url=SimpleNamespace(scheme="https"))

        with (
            patch("app.api.auth_routes.create_access_token", return_value="access"),
            patch("app.api.auth_routes.create_refresh_token", return_value="refresh"),
        ):
            result = create_auth_response(user, request, Response())

        self.assertEqual(result["role"], ROLE_ADMIN)

    async def test_refresh_returns_current_database_role(self) -> None:
        user_id = ObjectId()
        database_user = {
            "_id": user_id,
            "first_name": "Ava",
            "last_name": "Cook",
            "role": ROLE_ADMIN,
        }
        database = {"users": FakeUsersCollection(database_user)}
        request = SimpleNamespace(cookies={"refresh_token": "refresh"})

        with (
            patch(
                "app.api.auth_routes.decode_refresh_token",
                return_value={"sub": str(user_id), "role": ROLE_CHEF},
            ),
            patch(
                "app.api.auth_routes.create_access_token",
                return_value="new-access",
            ) as create_access_token,
        ):
            result = await refresh_token(request, database)

        self.assertEqual(result["role"], ROLE_ADMIN)
        self.assertEqual(result["first_name"], "Ava")
        self.assertEqual(
            create_access_token.call_args.args[0]["role"],
            ROLE_ADMIN,
        )

    async def test_profile_name_update_persists_names_and_refreshes_token(self) -> None:
        user_id = ObjectId()
        user = {
            "_id": user_id,
            "first_name": "Ava",
            "last_name": "Cook",
            "role": ROLE_ADMIN,
        }
        database = {"users": FakeUsersCollection(user)}
        names = ProfileNameUpdate(first_name="  Maya ", last_name=" Green  ")

        with (
            patch(
                "app.api.auth_routes.decode_access_token",
                return_value={"sub": str(user_id), "role": ROLE_ADMIN},
            ),
            patch(
                "app.api.auth_routes.create_access_token",
                return_value="updated-access",
            ) as create_access_token,
        ):
            result = await update_profile_names(
                names,
                "Bearer access",
                database,
            )

        self.assertEqual(user["first_name"], "Maya")
        self.assertEqual(user["last_name"], "Green")
        self.assertEqual(result["access_token"], "updated-access")
        self.assertEqual(
            create_access_token.call_args.args[0],
            {
                "sub": str(user_id),
                "role": ROLE_ADMIN,
                "first_name": "Maya",
                "last_name": "Green",
            },
        )

    async def test_profile_name_update_rejects_missing_authorization(self) -> None:
        names = ProfileNameUpdate(first_name="Ava", last_name="Cook")

        with self.assertRaises(HTTPException) as context:
            await update_profile_names(names, None, {})

        self.assertEqual(context.exception.status_code, 401)


if __name__ == "__main__":
    unittest.main()
