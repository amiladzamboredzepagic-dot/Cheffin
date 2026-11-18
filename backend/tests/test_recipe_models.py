import base64
import unittest

from pydantic import ValidationError

from app.recipes.models import (
    CuisineCreateData,
    DietaryPreferenceCreateData,
    RecipeCreateData,
)


class RecipeCreateDataTests(unittest.TestCase):
    def setUp(self) -> None:
        self.valid_recipe = {
            "title": "  Tomato soup  ",
            "ingredients": [" 2 tomatoes ", "", " salt "],
            "steps": ["  Simmer the tomatoes.  ", "  "],
            "prep_time_minutes": 20,
            "servings": 2,
            "meal_type": "lunch",
        }

    def test_normalizes_text_and_omits_blank_list_items(self) -> None:
        recipe = RecipeCreateData.model_validate(self.valid_recipe)

        self.assertEqual(recipe.title, "Tomato soup")
        self.assertEqual(recipe.ingredients, ["2 tomatoes", "salt"])
        self.assertEqual(recipe.steps, ["Simmer the tomatoes."])

    def test_validates_youtube_thumbnail_url(self) -> None:
        image_url = "https://img.youtube.com/vi/abcdefghijk/hqdefault.jpg"
        recipe = RecipeCreateData.model_validate(
            {**self.valid_recipe, "image_url": image_url}
        )
        self.assertEqual(recipe.image_url, image_url)

        for invalid_url in (
            "http://img.youtube.com/vi/abcdefghijk/hqdefault.jpg",
            "https://example.com/vi/abcdefghijk/hqdefault.jpg",
            "https://img.youtube.com/vi/short/hqdefault.jpg",
        ):
            with self.subTest(invalid_url=invalid_url):
                with self.assertRaises(ValidationError):
                    RecipeCreateData.model_validate(
                        {**self.valid_recipe, "image_url": invalid_url}
                    )

    def test_requires_title_ingredient_and_positive_integer_details(self) -> None:
        for invalid_fields in (
            {"title": "   "},
            {"ingredients": [" ", ""]},
            {"ingredients": ["2 tomatoes", 1]},
            {"prep_time_minutes": 0},
            {"servings": -1},
            {"servings": 2.5},
            {"meal_type": "brunch"},
        ):
            with self.subTest(invalid_fields=invalid_fields):
                with self.assertRaises(ValidationError):
                    RecipeCreateData.model_validate(
                        {**self.valid_recipe, **invalid_fields}
                    )

    def test_validates_recipe_taxonomy_and_defaults(self) -> None:
        defaults = RecipeCreateData.model_validate(self.valid_recipe)
        self.assertEqual(defaults.dietary_preferences, [])
        self.assertIsNone(defaults.cuisine)
        self.assertIsNone(defaults.difficulty)

        recipe = RecipeCreateData.model_validate(
            {
                **self.valid_recipe,
                "meal_type": "dessert",
                "dietary_preferences": ["vegan", "glutenFree"],
                "cuisine": "mediterranean",
                "difficulty": "hard",
            }
        )
        self.assertEqual(recipe.meal_type, "dessert")
        self.assertEqual(recipe.dietary_preferences, ["vegan", "glutenFree"])
        self.assertEqual(recipe.cuisine, "mediterranean")
        self.assertEqual(recipe.difficulty, "hard")

        custom = RecipeCreateData.model_validate(
            {
                **self.valid_recipe,
                "dietary_preferences": ["  low carb  "],
                "cuisine": "  Korean fusion  ",
            }
        )
        self.assertEqual(custom.dietary_preferences, ["low carb"])
        self.assertEqual(custom.cuisine, "Korean fusion")

        for invalid_fields in (
            {"dietary_preferences": [" "]},
            {"dietary_preferences": ["x" * 61]},
            {"cuisine": " "},
            {"cuisine": "x" * 61},
            {"dietary_preferences": [f"option-{index}" for index in range(13)]},
            {"difficulty": "project"},
        ):
            with self.subTest(invalid_fields=invalid_fields):
                with self.assertRaises(ValidationError):
                    RecipeCreateData.model_validate(
                        {**self.valid_recipe, **invalid_fields}
                    )

    def test_validates_photo_encoding_and_content_signature(self) -> None:
        photo = base64.b64encode(b"\x89PNG\r\n\x1a\nimage").decode("ascii")
        recipe = RecipeCreateData.model_validate(
            {
                **self.valid_recipe,
                "photo_base64": photo,
                "photo_content_type": "image/png",
            }
        )

        self.assertEqual(recipe.decoded_photo(), b"\x89PNG\r\n\x1a\nimage")

        with self.assertRaises(ValueError):
            RecipeCreateData.model_validate(
                {
                    **self.valid_recipe,
                    "photo_base64": base64.b64encode(b"not an image").decode(
                        "ascii"
                    ),
                    "photo_content_type": "image/png",
                }
            ).decoded_photo()

    def test_normalizes_and_validates_custom_dietary_preference(self) -> None:
        preference = DietaryPreferenceCreateData.model_validate(
            {"preference": "  Low Carb  "}
        )
        self.assertEqual(preference.preference, "Low Carb")
        self.assertEqual(preference.normalized_name, "low carb")

        for value in (" ", "x" * 61):
            with self.subTest(value=value):
                with self.assertRaises(ValidationError):
                    DietaryPreferenceCreateData.model_validate(
                        {"preference": value}
                    )

    def test_normalizes_and_validates_custom_cuisine(self) -> None:
        cuisine = CuisineCreateData.model_validate({"cuisine": "  Korean  "})
        self.assertEqual(cuisine.cuisine, "Korean")
        self.assertEqual(cuisine.normalized_name, "korean")

        for value in (" ", "x" * 61):
            with self.subTest(value=value):
                with self.assertRaises(ValidationError):
                    CuisineCreateData.model_validate({"cuisine": value})


if __name__ == "__main__":
    unittest.main()
