import base64
import binascii
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, StrictInt, field_validator

MAX_RECIPE_PHOTO_SIZE_BYTES = 10 * 1024 * 1024
MealType = Literal["breakfast", "lunch", "dinner", "snack"]


class RecipeCreateData(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    title: str = Field(min_length=1)
    description: str = ""
    ingredients: list[str] = Field(min_length=1)
    steps: list[str] = Field(default_factory=list)
    prep_time_minutes: StrictInt = Field(gt=0)
    servings: StrictInt = Field(gt=0)
    meal_type: MealType
    photo_base64: str | None = None
    photo_content_type: Literal["image/jpeg", "image/png"] | None = None

    @field_validator("ingredients", mode="before")
    @classmethod
    def remove_empty_ingredients(cls, value: object) -> object:
        if isinstance(value, list):
            if any(not isinstance(ingredient, str) for ingredient in value):
                return value
            return [
                ingredient.strip()
                for ingredient in value
                if ingredient.strip()
            ]
        return value

    @field_validator("steps", mode="before")
    @classmethod
    def remove_empty_steps(cls, value: object) -> object:
        if isinstance(value, list):
            if any(not isinstance(step, str) for step in value):
                return value
            return [
                step.strip()
                for step in value
                if step.strip()
            ]
        return value

    @field_validator("photo_base64")
    @classmethod
    def validate_photo_encoding(cls, value: str | None) -> str | None:
        if value is None:
            return value

        max_encoded_length = ((MAX_RECIPE_PHOTO_SIZE_BYTES + 2) // 3) * 4
        if len(value) > max_encoded_length:
            raise ValueError("Photo must be 10 MB or smaller")

        try:
            photo = base64.b64decode(value, validate=True)
        except (binascii.Error, ValueError) as error:
            raise ValueError("Photo must be valid base64 data") from error

        if len(photo) > MAX_RECIPE_PHOTO_SIZE_BYTES:
            raise ValueError("Photo must be 10 MB or smaller")

        return value

    def decoded_photo(self) -> bytes | None:
        if self.photo_base64 is None and self.photo_content_type is None:
            return None
        if self.photo_base64 is None or self.photo_content_type is None:
            raise ValueError("Photo data and content type must be provided together")

        photo = base64.b64decode(self.photo_base64, validate=True)
        if self.photo_content_type == "image/jpeg" and not photo.startswith(
            b"\xff\xd8\xff"
        ):
            raise ValueError("Photo content does not match JPEG format")
        if self.photo_content_type == "image/png" and not photo.startswith(
            b"\x89PNG\r\n\x1a\n"
        ):
            raise ValueError("Photo content does not match PNG format")
        return photo


class CollectionCreateData(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    name: str = Field(min_length=1, max_length=80)

    @property
    def normalized_name(self) -> str:
        return self.name.casefold()
