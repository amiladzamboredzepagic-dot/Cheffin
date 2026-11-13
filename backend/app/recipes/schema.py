from base64 import b64encode
from datetime import datetime, timezone
from typing import Any

import strawberry
from bson import Binary, ObjectId
from graphql import GraphQLError
from pydantic import ValidationError
from pymongo.errors import DuplicateKeyError

from app.db.database import get_database
from app.graphql.auth import require_auth
from app.recipes.models import CollectionCreateData, RecipeCreateData


def require_owner_id(info: strawberry.Info) -> str:
    user = require_auth(info)
    owner_id = user.get("sub")
    if not isinstance(owner_id, str) or not owner_id:
        raise GraphQLError("401: Unauthorized")
    return owner_id


@strawberry.type
class Collection:
    id: str
    name: str


@strawberry.type
class MyRecipe:
    id: str
    title: str
    description: str
    prep_time_minutes: int
    servings: int
    photo_content_type: str | None
    photo_base64: str | None


@strawberry.type
class Query:
    @strawberry.field
    async def my_collections(self, info: strawberry.Info) -> list[Collection]:
        owner_id = require_owner_id(info)
        cursor = get_database()["collections"].find(
            {"owner_id": owner_id}
        ).sort("name", 1)
        return [
            Collection(id=str(document["_id"]), name=document["name"])
            async for document in cursor
        ]

    @strawberry.field
    async def my_recipes(self, info: strawberry.Info) -> list[MyRecipe]:
        owner_id = require_owner_id(info)
        cursor = get_database()["recipes"].find(
            {"owner_id": owner_id}
        ).sort("created_at", -1)
        recipes = []
        async for document in cursor:
            photo = document["photo"]
            recipes.append(
                MyRecipe(
                    id=str(document["_id"]),
                    title=document["title"],
                    description=document["description"],
                    prep_time_minutes=document["prep_time_minutes"],
                    servings=document["servings"],
                    photo_content_type=photo["content_type"] if photo else None,
                    photo_base64=(
                        b64encode(photo["data"]).decode("ascii") if photo else None
                    ),
                )
            )
        return recipes


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
    collection_id: str | None = None


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
    collection_id: str | None
    is_private: bool
    created_at: datetime


@strawberry.type
class Mutation:
    @strawberry.mutation
    async def create_collection(
        self, info: strawberry.Info, name: str
    ) -> Collection:
        owner_id = require_owner_id(info)

        try:
            collection_data = CollectionCreateData.model_validate({"name": name})
        except ValidationError as error:
            raise GraphQLError(
                "Collection name must contain 1 to 80 characters",
                extensions={"code": "BAD_USER_INPUT"},
            ) from error

        collection_document = {
            "owner_id": owner_id,
            "name": collection_data.name,
            "normalized_name": collection_data.normalized_name,
            "created_at": datetime.now(timezone.utc),
        }
        try:
            result = await get_database()["collections"].insert_one(
                collection_document
            )
        except DuplicateKeyError as error:
            raise GraphQLError(
                "A collection with this name already exists",
                extensions={"code": "COLLECTION_EXISTS"},
            ) from error

        return Collection(id=str(result.inserted_id), name=collection_data.name)

    @strawberry.mutation
    async def create_recipe(
        self, info: strawberry.Info, input: CreateRecipeInput
    ) -> Recipe:
        owner_id = require_owner_id(info)

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

        collection_object_id = None
        if input.collection_id is not None:
            if not ObjectId.is_valid(input.collection_id):
                raise GraphQLError(
                    "Invalid collection",
                    extensions={"code": "BAD_USER_INPUT"},
                )
            collection_object_id = ObjectId(input.collection_id)
            collection = await get_database()["collections"].find_one(
                {"_id": collection_object_id, "owner_id": owner_id}
            )
            if collection is None:
                raise GraphQLError(
                    "Collection not found",
                    extensions={"code": "BAD_USER_INPUT"},
                )

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
            "collection_id": collection_object_id,
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
            collection_id=(
                str(collection_object_id) if collection_object_id is not None else None
            ),
            is_private=True,
            created_at=created_at,
        )
