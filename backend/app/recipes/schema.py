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
from app.recipes.metadata import (
    RECIPE_CUISINES,
    RECIPE_DIETARY_PREFERENCES,
    RECIPE_DIFFICULTIES,
)
from app.recipes.models import (
    CollectionCreateData,
    CuisineCreateData,
    DietaryPreferenceCreateData,
    RecipeCreateData,
)


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
    dietary_preferences: list[str]
    cuisine: str | None
    difficulty: str | None
    photo_content_type: str | None
    photo_base64: str | None
    is_private: bool
    collection_id: str | None


@strawberry.type
class PublicRecipe:
    id: str
    title: str
    description: str
    ingredients: list[str]
    steps: list[str]
    prep_time_minutes: int
    servings: int
    meal_type: str
    dietary_preferences: list[str]
    cuisine: str | None
    difficulty: str | None
    photo_content_type: str | None
    photo_base64: str | None


@strawberry.type
class RecipeMetadata:
    dietary_preferences: list[str]
    custom_dietary_preferences: list[str]
    cuisines: list[str]
    custom_cuisines: list[str]
    difficulties: list[str]


@strawberry.type
class Query:
    @strawberry.field
    async def recipe_metadata(self, info: strawberry.Info) -> RecipeMetadata:
        custom_preferences: list[str] = []
        custom_cuisines: list[str] = []
        user = getattr(info.context, "user", None)
        if user:
            owner_id = user.get("sub")
            if not isinstance(owner_id, str) or not owner_id:
                raise GraphQLError("401: Unauthorized")
            cursor = get_database()["dietary_preferences"].find(
                {"owner_id": owner_id}
            ).sort("normalized_name", 1)
            custom_preferences = [
                document["preference"] async for document in cursor
            ]
            cuisine_cursor = get_database()["cuisines"].find(
                {"owner_id": owner_id}
            ).sort("normalized_name", 1)
            custom_cuisines = [
                document["cuisine"] async for document in cuisine_cursor
            ]

        return RecipeMetadata(
            dietary_preferences=list(RECIPE_DIETARY_PREFERENCES),
            custom_dietary_preferences=custom_preferences,
            cuisines=list(RECIPE_CUISINES),
            custom_cuisines=custom_cuisines,
            difficulties=list(RECIPE_DIFFICULTIES),
        )

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
                    dietary_preferences=document.get("dietary_preferences") or [],
                    cuisine=document.get("cuisine"),
                    difficulty=document.get("difficulty"),
                    photo_content_type=photo["content_type"] if photo else None,
                    photo_base64=(
                        b64encode(photo["data"]).decode("ascii") if photo else None
                    ),
                    is_private=document.get("is_private", True),
                    collection_id=(
                        str(document["collection_id"])
                        if document.get("collection_id") is not None
                        else None
                    ),
                )
            )
        return recipes

    @strawberry.field
    async def public_recipes(self) -> list[PublicRecipe]:
        cursor = get_database()["recipes"].find(
            {"is_private": False}
        ).sort("created_at", -1)
        recipes = []
        async for document in cursor:
            photo = document["photo"]
            recipes.append(
                PublicRecipe(
                    id=str(document["_id"]),
                    title=document["title"],
                    description=document["description"],
                    ingredients=document["ingredients"],
                    steps=document["steps"],
                    prep_time_minutes=document["prep_time_minutes"],
                    servings=document["servings"],
                    meal_type=document["meal_type"],
                    dietary_preferences=document.get("dietary_preferences") or [],
                    cuisine=document.get("cuisine"),
                    difficulty=document.get("difficulty"),
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
    dietary_preferences: list[str] = strawberry.field(default_factory=list)
    cuisine: str | None = None
    difficulty: str | None = None
    photo_base64: str | None = None
    photo_content_type: str | None = None
    collection_id: str | None = None
    publish: bool = False


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
    dietary_preferences: list[str]
    cuisine: str | None
    difficulty: str | None
    photo_content_type: str | None
    collection_id: str | None
    is_private: bool
    created_at: datetime


@strawberry.type
class Mutation:
    @strawberry.mutation
    async def add_cuisine(self, info: strawberry.Info, cuisine: str) -> str:
        owner_id = require_owner_id(info)

        try:
            cuisine_data = CuisineCreateData.model_validate({"cuisine": cuisine})
        except ValidationError as error:
            raise GraphQLError(
                "Cuisine must contain 1 to 60 characters",
                extensions={"code": "BAD_USER_INPUT"},
            ) from error

        standard_cuisine = next(
            (
                option
                for option in RECIPE_CUISINES
                if option.casefold() == cuisine_data.normalized_name
            ),
            None,
        )
        if standard_cuisine is not None:
            return standard_cuisine

        cuisines = get_database()["cuisines"]
        await cuisines.update_one(
            {
                "owner_id": owner_id,
                "normalized_name": cuisine_data.normalized_name,
            },
            {
                "$setOnInsert": {
                    "owner_id": owner_id,
                    "cuisine": cuisine_data.cuisine,
                    "normalized_name": cuisine_data.normalized_name,
                }
            },
            upsert=True,
        )
        saved = await cuisines.find_one(
            {
                "owner_id": owner_id,
                "normalized_name": cuisine_data.normalized_name,
            }
        )
        if saved is None:
            raise GraphQLError("Could not save cuisine")
        return saved["cuisine"]

    @strawberry.mutation
    async def add_dietary_preference(
        self, info: strawberry.Info, preference: str
    ) -> str:
        owner_id = require_owner_id(info)

        try:
            preference_data = DietaryPreferenceCreateData.model_validate(
                {"preference": preference}
            )
        except ValidationError as error:
            raise GraphQLError(
                "Dietary preference must contain 1 to 60 characters",
                extensions={"code": "BAD_USER_INPUT"},
            ) from error

        preferences = get_database()["dietary_preferences"]
        await preferences.update_one(
            {
                "owner_id": owner_id,
                "normalized_name": preference_data.normalized_name,
            },
            {
                "$setOnInsert": {
                    "owner_id": owner_id,
                    "preference": preference_data.preference,
                    "normalized_name": preference_data.normalized_name,
                }
            },
            upsert=True,
        )
        saved = await preferences.find_one(
            {
                "owner_id": owner_id,
                "normalized_name": preference_data.normalized_name,
            }
        )
        if saved is None:
            raise GraphQLError("Could not save dietary preference")
        return saved["preference"]

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
                    "dietary_preferences": input.dietary_preferences,
                    "cuisine": input.cuisine,
                    "difficulty": input.difficulty,
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
            "dietary_preferences": recipe_data.dietary_preferences,
            "cuisine": recipe_data.cuisine,
            "difficulty": recipe_data.difficulty,
            "photo": (
                {
                    "content_type": recipe_data.photo_content_type,
                    "data": Binary(photo_bytes),
                }
                if photo_bytes is not None
                else None
            ),
            "collection_id": collection_object_id,
            "is_private": not input.publish,
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
            dietary_preferences=recipe_data.dietary_preferences,
            cuisine=recipe_data.cuisine,
            difficulty=recipe_data.difficulty,
            photo_content_type=recipe_data.photo_content_type,
            collection_id=(
                str(collection_object_id) if collection_object_id is not None else None
            ),
            is_private=not input.publish,
            created_at=created_at,
        )

    @strawberry.mutation
    async def publish_recipe(self, info: strawberry.Info, recipe_id: str) -> bool:
        owner_id = require_owner_id(info)
        if not ObjectId.is_valid(recipe_id):
            raise GraphQLError("Recipe not found", extensions={"code": "NOT_FOUND"})

        result = await get_database()["recipes"].update_one(
            {"_id": ObjectId(recipe_id), "owner_id": owner_id},
            {"$set": {"is_private": False}},
        )
        if result.matched_count == 0:
            raise GraphQLError("Recipe not found", extensions={"code": "NOT_FOUND"})
        return True
