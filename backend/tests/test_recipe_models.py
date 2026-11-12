import base64
import unittest

from pydantic import ValidationError

from app.recipes.models import RecipeCreateData


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


if __name__ == "__main__":
    unittest.main()
