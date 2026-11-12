from datetime import datetime, timezone
from typing import Any

import strawberry
from bson import Binary
from graphql import GraphQLError
from pydantic import ValidationError

from app.db.database import get_database
from app.graphql.auth import require_auth
from app.recipes.models import RecipeCreateData


@strawberry.input
class CreateRecipeInput:
    title: str
    ingredients: list[str]
    prep_time_minutes: int
    servings: int
    meal_type: str
    description: str | None = None
    steps: list[str] = strawberry.field(default_factory=list)
    photo_base64: str | None = None
    photo_content_type: str | None = None


@strawberry.type
class Recipe:
    id: str
    title: str
    description: str
    ingredients: list[str]
    steps: list[str]
    prep_time_minutes: int
    servings: int
    meal_type: str
    photo_content_type: str | None
    is_private: bool
    created_at: datetime


@strawberry.type
class Mutation:
    @strawberry.mutation
    async def create_recipe(
        self, info: strawberry.Info, input: CreateRecipeInput
    ) -> Recipe:
        user = require_auth(info)
        owner_id = user.get("sub")
        if not isinstance(owner_id, str) or not owner_id:
            raise GraphQLError("401: Unauthorized")

        try:
            recipe_data = RecipeCreateData.model_validate(
                {
                    "title": input.title,
                    "description": input.description or "",
                    "ingredients": input.ingredients,
                    "steps": input.steps,
                    "prep_time_minutes": input.prep_time_minutes,
                    "servings": input.servings,
                    "meal_type": input.meal_type,
                    "photo_base64": input.photo_base64,
                    "photo_content_type": input.photo_content_type,
                }
            )
            photo_bytes = recipe_data.decoded_photo()
        except (ValidationError, ValueError) as error:
            raise GraphQLError(
                "Invalid recipe input",
                extensions={"code": "BAD_USER_INPUT"},
            ) from error

        created_at = datetime.now(timezone.utc)
        recipe_document: dict[str, Any] = {
            "owner_id": owner_id,
            "title": recipe_data.title,
            "description": recipe_data.description,
            "ingredients": recipe_data.ingredients,
            "steps": recipe_data.steps,
            "prep_time_minutes": recipe_data.prep_time_minutes,
            "servings": recipe_data.servings,
            "meal_type": recipe_data.meal_type,
            "photo": (
                {
                    "content_type": recipe_data.photo_content_type,
                    "data": Binary(photo_bytes),
                }
                if photo_bytes is not None
                else None
            ),
            "collection_id": None,
            "is_private": True,
            "created_at": created_at,
        }

        result = await get_database()["recipes"].insert_one(recipe_document)
        return Recipe(
            id=str(result.inserted_id),
            title=recipe_data.title,
            description=recipe_data.description,
            ingredients=recipe_data.ingredients,
            steps=recipe_data.steps,
            prep_time_minutes=recipe_data.prep_time_minutes,
            servings=recipe_data.servings,
            meal_type=recipe_data.meal_type,
            photo_content_type=recipe_data.photo_content_type,
            is_private=True,
            created_at=created_at,
        )
