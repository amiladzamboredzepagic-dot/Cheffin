import strawberry
from typing import List
from app.database import get_database

#This schema design is a testing mock-up

@strawberry.type
class Recipe:
    id: str
    title: str
    description: str
    image_url: str
    calories: int

@strawberry.type
class Query:
    @strawberry.field
    async def recipes(self) -> List[Recipe]:
        db = get_database()
        recipes_cursor = db.recipes.find()
        recipes = []
        async for doc in recipes_cursor:
            recipes.append(
                Recipe(
                    id=str(doc["_id"]),
                    title=doc.get("title", ""),
                    description=doc.get("description", ""),
                    image_url=doc.get("image_url", ""),
                    calories=doc.get("calories", 0)
                )
            )
        return recipes

@strawberry.type
class Mutation:
    @strawberry.mutation
    async def add_recipe(self, title: str, description: str, image_url: str, calories: int) -> Recipe:
        db = get_database()
        new_recipe = {
            "title": title,
            "description": description,
            "image_url": image_url,
            "calories": calories
        }
        result = await db.recipes.insert_one(new_recipe)
        return Recipe(
            id=str(result.inserted_id),
            title=title,
            description=description,
            image_url=image_url,
            calories=calories
        )

schema = strawberry.Schema(query=Query, mutation=Mutation)