import unittest
from base64 import b64encode
from datetime import datetime, timezone
from types import SimpleNamespace
from unittest.mock import patch

from bson import ObjectId

from app.graphql.schema import schema


class FakeRecipeCollection:
    def __init__(self) -> None:
        self.document: dict | None = None
        self.documents: list[dict] = []

    async def insert_one(self, document: dict) -> SimpleNamespace:
        self.document = document
        inserted_id = ObjectId()
        self.documents.append({**document, "_id": inserted_id})
        return SimpleNamespace(inserted_id=inserted_id)

    async def find_one(self, query: dict) -> dict | None:
        return next(
            (
                document
                for document in self.documents
                if all(document.get(key) == value for key, value in query.items())
            ),
            None,
        )

    def find(self, query: dict) -> "FakeRecipeCursor":
        return FakeRecipeCursor(
            [
                document
                for document in self.documents
                if all(document.get(key) == value for key, value in query.items())
            ]
        )

    async def update_one(self, query: dict, update: dict) -> SimpleNamespace:
        for document in self.documents:
            if all(document.get(key) == value for key, value in query.items()):
                document.update(update["$set"])
                return SimpleNamespace(matched_count=1)
        return SimpleNamespace(matched_count=0)

    async def delete_one(self, query: dict) -> SimpleNamespace:
        for index, document in enumerate(self.documents):
            if all(document.get(key) == value for key, value in query.items()):
                self.documents.pop(index)
                return SimpleNamespace(deleted_count=1)
        return SimpleNamespace(deleted_count=0)

    async def delete_many(self, query: dict) -> SimpleNamespace:
        matching = [
            document
            for document in self.documents
            if all(document.get(key) == value for key, value in query.items())
        ]
        self.documents[:] = [
            document for document in self.documents if document not in matching
        ]
        return SimpleNamespace(deleted_count=len(matching))


class FakeRecipeCursor:
    def __init__(self, documents: list[dict]) -> None:
        self.documents = documents

    def sort(self, key: str, direction: int) -> "FakeRecipeCursor":
        self.documents.sort(key=lambda document: document[key], reverse=direction < 0)
        return self

    def __aiter__(self):
        return self._iterate()

    async def _iterate(self):
        for document in self.documents:
            yield document


class FakeUserMetadataCollection:
    def __init__(self) -> None:
        self.documents: list[dict] = []

    def find(self, query: dict) -> FakeRecipeCursor:
        return FakeRecipeCursor(
            [
                document
                for document in self.documents
                if all(document.get(key) == value for key, value in query.items())
            ]
        )

    async def find_one(self, query: dict) -> dict | None:
        return next(
            (
                document
                for document in self.documents
                if all(
                    document.get(key) == value for key, value in query.items()
                )
            ),
            None,
        )

    async def update_one(
        self,
        query: dict,
        update: dict,
        upsert: bool = False,
    ) -> SimpleNamespace:
        existing = await self.find_one(query)
        if existing is not None:
            return SimpleNamespace(upserted_id=None)
        if upsert:
            self.documents.append(
                {**update["$setOnInsert"], "_id": ObjectId()}
            )
        return SimpleNamespace(upserted_id=ObjectId() if upsert else None)


class FakeDatabase:
    def __init__(self) -> None:
        self.recipes = FakeRecipeCollection()
        self.saved_recipes = FakeRecipeCollection()
        self.dietary_preferences = FakeUserMetadataCollection()
        self.cuisines = FakeUserMetadataCollection()

    def __getitem__(self, collection_name: str):
        if collection_name == "recipes":
            return self.recipes
        if collection_name == "saved_recipes":
            return self.saved_recipes
        if collection_name == "dietary_preferences":
            return self.dietary_preferences
        if collection_name == "cuisines":
            return self.cuisines
        raise AssertionError(f"Unexpected collection: {collection_name}")


class CreateRecipeMutationTests(unittest.IsolatedAsyncioTestCase):
    async def test_returns_recipe_metadata(self) -> None:
        result = await schema.execute(
            """
            {
              recipeMetadata {
                dietaryPreferences
                customDietaryPreferences
                cuisines
                customCuisines
                difficulties
              }
            }
            """,
            context_value=SimpleNamespace(user=None),
        )

        self.assertIsNone(result.errors)
        self.assertEqual(
            result.data["recipeMetadata"],
            {
                "dietaryPreferences": [
                    "vegetarian",
                    "vegan",
                    "glutenFree",
                    "dairyFree",
                    "highProtein",
                ],
                "customDietaryPreferences": [],
                "cuisines": ["italian", "mediterranean", "asian", "mexican"],
                "customCuisines": [],
                "difficulties": ["easy", "medium", "hard"],
            },
        )

    async def test_custom_cuisines_are_private_and_deduplicated(self) -> None:
        database = FakeDatabase()
        mutation = """
            mutation AddCuisine($cuisine: String!) {
              addCuisine(cuisine: $cuisine)
            }
        """
        query = """
            {
              recipeMetadata {
                customCuisines
              }
            }
        """

        with patch("app.recipes.schema.get_database", return_value=database):
            added = await schema.execute(
                mutation,
                variable_values={"cuisine": "Korean"},
                context_value=SimpleNamespace(user={"sub": "owner"}),
            )
            duplicate = await schema.execute(
                mutation,
                variable_values={"cuisine": " korean "},
                context_value=SimpleNamespace(user={"sub": "owner"}),
            )
            owner_metadata = await schema.execute(
                query,
                context_value=SimpleNamespace(user={"sub": "owner"}),
            )
            other_metadata = await schema.execute(
                query,
                context_value=SimpleNamespace(user={"sub": "other"}),
            )

        self.assertIsNone(added.errors)
        self.assertEqual(added.data["addCuisine"], "Korean")
        self.assertIsNone(duplicate.errors)
        self.assertEqual(duplicate.data["addCuisine"], "Korean")
        self.assertEqual(
            owner_metadata.data["recipeMetadata"]["customCuisines"],
            ["Korean"],
        )
        self.assertEqual(
            other_metadata.data["recipeMetadata"]["customCuisines"],
            [],
        )

    async def test_custom_dietary_preferences_are_private_and_deduplicated(self) -> None:
        database = FakeDatabase()
        mutation = """
            mutation AddPreference($preference: String!) {
              addDietaryPreference(preference: $preference)
            }
        """
        query = """
            {
              recipeMetadata {
                customDietaryPreferences
              }
            }
        """

        with patch("app.recipes.schema.get_database", return_value=database):
            added = await schema.execute(
                mutation,
                variable_values={"preference": "Low carb"},
                context_value=SimpleNamespace(user={"sub": "owner"}),
            )
            duplicate = await schema.execute(
                mutation,
                variable_values={"preference": " low CARB "},
                context_value=SimpleNamespace(user={"sub": "owner"}),
            )
            owner_metadata = await schema.execute(
                query,
                context_value=SimpleNamespace(user={"sub": "owner"}),
            )
            other_metadata = await schema.execute(
                query,
                context_value=SimpleNamespace(user={"sub": "other"}),
            )

        self.assertIsNone(added.errors)
        self.assertEqual(added.data["addDietaryPreference"], "Low carb")
        self.assertIsNone(duplicate.errors)
        self.assertEqual(duplicate.data["addDietaryPreference"], "Low carb")
        self.assertEqual(
            owner_metadata.data["recipeMetadata"]["customDietaryPreferences"],
            ["Low carb"],
        )
        self.assertEqual(
            other_metadata.data["recipeMetadata"]["customDietaryPreferences"],
            [],
        )

    async def test_persists_and_returns_recipe_taxonomy(self) -> None:
        database = FakeDatabase()
        create = """
            mutation CreateRecipe($input: CreateRecipeInput!) {
              createRecipe(input: $input) {
                mealType
                dietaryPreferences
                cuisine
                difficulty
              }
            }
        """
        recipe_input = {
            "title": "Berry tart",
            "ingredients": ["berries"],
            "prepTimeMinutes": 40,
            "servings": 6,
            "mealType": "dessert",
            "dietaryPreferences": ["low carb", "whole30"],
            "cuisine": "Korean fusion",
            "difficulty": "medium",
            "publish": True,
        }

        with patch("app.recipes.schema.get_database", return_value=database):
            created = await schema.execute(
                create,
                variable_values={"input": recipe_input},
                context_value=SimpleNamespace(user={"sub": "owner"}),
            )
            mine = await schema.execute(
                """
                { myRecipes {
                    ingredients steps mealType
                    dietaryPreferences cuisine difficulty
                } }
                """,
                context_value=SimpleNamespace(user={"sub": "owner"}),
            )
            public = await schema.execute(
                """
                { publicRecipes {
                    mealType dietaryPreferences cuisine difficulty
                } }
                """,
                context_value=SimpleNamespace(user=None),
            )

        self.assertIsNone(created.errors)
        self.assertEqual(
            created.data["createRecipe"],
            {
                "mealType": "dessert",
                "dietaryPreferences": ["low carb", "whole30"],
                "cuisine": "Korean fusion",
                "difficulty": "medium",
            },
        )
        self.assertEqual(
            database.recipes.document["dietary_preferences"],
            ["low carb", "whole30"],
        )
        self.assertEqual(database.recipes.document["cuisine"], "Korean fusion")
        self.assertEqual(database.recipes.document["difficulty"], "medium")
        self.assertIsNone(mine.errors)
        self.assertEqual(
            mine.data["myRecipes"][0],
            {
                "ingredients": ["berries"],
                "steps": [],
                "mealType": "dessert",
                "dietaryPreferences": ["low carb", "whole30"],
                "cuisine": "Korean fusion",
                "difficulty": "medium",
            },
        )
        self.assertIsNone(public.errors)
        self.assertEqual(
            public.data["publicRecipes"][0],
            {
                "mealType": "dessert",
                "dietaryPreferences": ["low carb", "whole30"],
                "cuisine": "Korean fusion",
                "difficulty": "medium",
            },
        )

    async def test_publishing_is_owner_only_and_public_listing_excludes_drafts(self) -> None:
        database = FakeDatabase()
        create = """
            mutation Create($input: CreateRecipeInput!) {
              createRecipe(input: $input) { id isPrivate }
            }
        """
        publish = """
            mutation Publish($id: String!) { publishRecipe(recipeId: $id) }
        """
        recipe_input = {
            "title": "Tomato soup",
            "ingredients": ["2 tomatoes"],
            "steps": ["Cook"],
            "prepTimeMinutes": 20,
            "servings": 2,
            "mealType": "lunch",
        }
        with patch("app.recipes.schema.get_database", return_value=database):
            draft = await schema.execute(
                create, variable_values={"input": recipe_input},
                context_value=SimpleNamespace(user={"sub": "owner"}),
            )
            direct = await schema.execute(
                create, variable_values={"input": {**recipe_input, "publish": True}},
                context_value=SimpleNamespace(user={"sub": "other"}),
            )
            recipe_id = draft.data["createRecipe"]["id"]
            rejected = await schema.execute(
                publish, variable_values={"id": recipe_id},
                context_value=SimpleNamespace(user={"sub": "other"}),
            )
            anonymous = await schema.execute(
                publish, variable_values={"id": recipe_id},
                context_value=SimpleNamespace(user=None),
            )
            invalid = await schema.execute(
                publish, variable_values={"id": "invalid"},
                context_value=SimpleNamespace(user={"sub": "owner"}),
            )
            before = await schema.execute(
                "{ publicRecipes { id ingredients steps } }",
                context_value=SimpleNamespace(user=None),
            )
            published = await schema.execute(
                publish, variable_values={"id": recipe_id},
                context_value=SimpleNamespace(user={"sub": "owner"}),
            )
            after = await schema.execute(
                "{ publicRecipes { id ingredients steps } }",
                context_value=SimpleNamespace(user=None),
            )
            mine = await schema.execute(
                "{ myRecipes { id isPrivate } }",
                context_value=SimpleNamespace(user={"sub": "owner"}),
            )
            direct_mine = await schema.execute(
                "{ myRecipes { id isPrivate } }",
                context_value=SimpleNamespace(user={"sub": "other"}),
            )

        self.assertIsNone(draft.errors)
        self.assertTrue(draft.data["createRecipe"]["isPrivate"])
        self.assertIsNone(direct.errors)
        self.assertFalse(direct.data["createRecipe"]["isPrivate"])
        self.assertIsNotNone(rejected.errors)
        self.assertIsNotNone(anonymous.errors)
        self.assertIsNotNone(invalid.errors)
        self.assertIsNone(before.errors)
        self.assertEqual([item["id"] for item in before.data["publicRecipes"]], [direct.data["createRecipe"]["id"]])
        self.assertIsNone(published.errors)
        self.assertTrue(published.data["publishRecipe"])
        self.assertIsNone(after.errors)
        self.assertEqual(len(after.data["publicRecipes"]), 2)
        self.assertEqual(after.data["publicRecipes"][0]["ingredients"], ["2 tomatoes"])
        self.assertEqual(after.data["publicRecipes"][0]["steps"], ["Cook"])
        self.assertFalse(mine.data["myRecipes"][0]["isPrivate"])
        self.assertEqual(
            direct_mine.data["myRecipes"][0]["id"], direct.data["createRecipe"]["id"]
        )
        self.assertFalse(direct_mine.data["myRecipes"][0]["isPrivate"])

    async def test_update_recipe_is_owner_only_and_preserves_photo_and_visibility(
        self,
    ) -> None:
        database = FakeDatabase()
        recipe_id = ObjectId()
        original_photo = {
            "content_type": "image/png",
            "data": b"\x89PNG\r\n\x1a\noriginal",
        }
        database.recipes.documents.append(
            {
                "_id": recipe_id,
                "owner_id": "owner",
                "title": "Original",
                "description": "",
                "ingredients": ["flour"],
                "steps": [],
                "prep_time_minutes": 20,
                "servings": 2,
                "meal_type": "lunch",
                "dietary_preferences": [],
                "cuisine": None,
                "difficulty": None,
                "photo": original_photo,
                "collection_id": None,
                "is_private": False,
                "created_at": datetime.now(timezone.utc),
            }
        )
        mutation = """
            mutation UpdateRecipe($id: String!, $input: UpdateRecipeInput!) {
              updateRecipe(recipeId: $id, input: $input)
            }
        """
        variables = {
            "id": str(recipe_id),
            "input": {
                "title": "Updated",
                "description": "A better recipe",
                "ingredients": ["flour", "water"],
                "steps": ["Mix"],
                "prepTimeMinutes": 35,
                "servings": 4,
                "mealType": "dinner",
                "dietaryPreferences": ["vegan"],
                "cuisine": "Italian",
                "difficulty": "easy",
                "collectionId": None,
            },
        }

        with patch("app.recipes.schema.get_database", return_value=database):
            rejected = await schema.execute(
                mutation,
                variable_values=variables,
                context_value=SimpleNamespace(user={"sub": "other"}),
            )
            updated = await schema.execute(
                mutation,
                variable_values=variables,
                context_value=SimpleNamespace(user={"sub": "owner"}),
            )

        self.assertIsNotNone(rejected.errors)
        self.assertIsNone(updated.errors)
        self.assertTrue(updated.data["updateRecipe"])
        recipe = database.recipes.documents[0]
        self.assertEqual(recipe["title"], "Updated")
        self.assertEqual(recipe["ingredients"], ["flour", "water"])
        self.assertEqual(recipe["meal_type"], "dinner")
        self.assertEqual(recipe["photo"], original_photo)
        self.assertFalse(recipe["is_private"])

    async def test_delete_recipe_is_owner_only_and_removes_saved_references(self) -> None:
        database = FakeDatabase()
        recipe_id = ObjectId()
        other_recipe_id = ObjectId()
        database.recipes.documents.extend(
            [
                {"_id": recipe_id, "owner_id": "owner"},
                {"_id": other_recipe_id, "owner_id": "other"},
            ]
        )
        database.saved_recipes.documents.extend(
            [
                {"owner_id": "owner", "recipe_id": recipe_id},
                {"owner_id": "reader", "recipe_id": recipe_id},
                {"owner_id": "owner", "recipe_id": other_recipe_id},
            ]
        )
        mutation = """
            mutation DeleteRecipe($id: String!) {
              deleteRecipe(recipeId: $id)
            }
        """
        variables = {"id": str(recipe_id)}

        with patch("app.recipes.schema.get_database", return_value=database):
            rejected = await schema.execute(
                mutation,
                variable_values=variables,
                context_value=SimpleNamespace(user={"sub": "other"}),
            )
            deleted = await schema.execute(
                mutation,
                variable_values=variables,
                context_value=SimpleNamespace(user={"sub": "owner"}),
            )

        self.assertIsNotNone(rejected.errors)
        self.assertIsNone(deleted.errors)
        self.assertTrue(deleted.data["deleteRecipe"])
        self.assertEqual(
            [document["_id"] for document in database.recipes.documents],
            [other_recipe_id],
        )
        self.assertEqual(
            [document["recipe_id"] for document in database.saved_recipes.documents],
            [other_recipe_id],
        )

    async def test_saves_recipe_as_private_to_authenticated_user(self) -> None:
        database = FakeDatabase()
        query = """
            mutation CreateRecipe($input: CreateRecipeInput!) {
              createRecipe(input: $input) {
                id
                title
                isPrivate
              }
            }
        """

        with patch("app.recipes.schema.get_database", return_value=database):
            result = await schema.execute(
                query,
                variable_values={
                    "input": {
                        "title": "Tomato soup",
                        "description": "",
                        "ingredients": ["2 tomatoes"],
                        "steps": [],
                        "prepTimeMinutes": 20,
                        "servings": 2,
                        "mealType": "lunch",
                    }
                },
                context_value=SimpleNamespace(user={"sub": "user-123"}),
            )
            listed = await schema.execute(
                "{ myRecipes { id title } }",
                context_value=SimpleNamespace(user={"sub": "user-123"}),
            )

        self.assertIsNone(result.errors)
        self.assertEqual(result.data["createRecipe"]["title"], "Tomato soup")
        self.assertTrue(result.data["createRecipe"]["isPrivate"])
        self.assertEqual(database.recipes.document["owner_id"], "user-123")
        self.assertTrue(database.recipes.document["is_private"])
        self.assertIsNone(database.recipes.document["collection_id"])
        self.assertIsNone(listed.errors)
        self.assertEqual(listed.data["myRecipes"][0]["id"], result.data["createRecipe"]["id"])

    async def test_lists_only_current_users_recipes_newest_first(self) -> None:
        database = FakeDatabase()
        photo = b"\x89PNG\r\n\x1a\nexample"
        database.recipes.documents = [
            {
                "_id": ObjectId(),
                "owner_id": owner,
                "title": title,
                "description": "",
                "prep_time_minutes": 20,
                "servings": 2,
                "photo": recipe_photo,
                "created_at": datetime(2026, 1, day, tzinfo=timezone.utc),
            }
            for owner, title, day, recipe_photo in [
                ("user-1", "Older", 1, None),
                ("user-2", "Private", 3, None),
                ("user-1", "Newer", 2, {"content_type": "image/png", "data": photo}),
            ]
        ]
        query = """
            { myRecipes {
                id title description prepTimeMinutes servings dietaryPreferences cuisine difficulty photoContentType photoBase64 isPrivate collectionId
            } }
        """

        with patch("app.recipes.schema.get_database", return_value=database):
            result = await schema.execute(
                query, context_value=SimpleNamespace(user={"sub": "user-1"})
            )
            unauthenticated = await schema.execute(
                query, context_value=SimpleNamespace(user=None)
            )
            empty = await schema.execute(
                query, context_value=SimpleNamespace(user={"sub": "user-3"})
            )
            public = await schema.execute(
                "{ publicRecipes { id } }", context_value=SimpleNamespace(user=None)
            )

        self.assertIsNone(result.errors)
        recipes = result.data["myRecipes"]
        self.assertEqual([recipe["title"] for recipe in recipes], ["Newer", "Older"])
        self.assertEqual(recipes[0]["photoBase64"], b64encode(photo).decode("ascii"))
        self.assertEqual(recipes[0]["photoContentType"], "image/png")
        self.assertIsNone(recipes[1]["photoBase64"])
        self.assertIsNone(recipes[1]["photoContentType"])
        self.assertEqual(recipes[0]["prepTimeMinutes"], 20)
        self.assertEqual(recipes[0]["servings"], 2)
        self.assertEqual(recipes[0]["dietaryPreferences"], [])
        self.assertIsNone(recipes[0]["cuisine"])
        self.assertIsNone(recipes[0]["difficulty"])
        self.assertTrue(all(recipe["isPrivate"] for recipe in recipes))
        self.assertTrue(all(recipe["collectionId"] is None for recipe in recipes))
        self.assertIsNotNone(unauthenticated.errors)
        self.assertIsNone(empty.errors)
        self.assertEqual(empty.data["myRecipes"], [])
        self.assertIsNone(public.errors)
        self.assertEqual(public.data["publicRecipes"], [])


if __name__ == "__main__":
    unittest.main()
