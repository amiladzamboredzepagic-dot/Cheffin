import strawberry
from app.graphql.auth import require_role
from app.db.database import get_database
from app.recipes.schema import Mutation as RecipeMutation
from app.recipes.schema import Query as RecipeQuery


@strawberry.type
class AdminUserStats:
    id: str
    first_name: str
    last_name: str
    email: str
    recipe_count: int
    published_recipe_count: int
    draft_recipe_count: int
    collection_count: int


@strawberry.type
class AdminDashboardStats:
    total_users: int
    total_recipes: int
    published_recipes: int
    draft_recipes: int
    total_collections: int
    total_saved_recipes: int
    users: list[AdminUserStats]


@strawberry.type
class Query(RecipeQuery):
    @strawberry.field
    def admin_data(self, info: strawberry.Info) -> str:
        require_role(info, "admin")
        return "Confidential Admin System Metrics"

    @strawberry.field
    async def admin_dashboard_stats(
        self, info: strawberry.Info
    ) -> AdminDashboardStats:
        require_role(info, "admin")
        database = get_database()
        users_collection = database["users"]
        recipe_collection = database["recipes"]
        collection_collection = database["collections"]

        user_documents = [
            user
            async for user in users_collection.find(
                {},
                {"password": 0},
            ).sort([("first_name", 1), ("last_name", 1)])
        ]
        recipe_stats = {
            str(stat["_id"]): stat
            async for stat in recipe_collection.aggregate(
                [
                    {
                        "$group": {
                            "_id": "$owner_id",
                            "recipe_count": {"$sum": 1},
                            "published_recipe_count": {
                                "$sum": {
                                    "$cond": [
                                        {"$eq": ["$is_private", False]},
                                        1,
                                        0,
                                    ]
                                }
                            },
                            "draft_recipe_count": {
                                "$sum": {
                                    "$cond": [
                                        {"$ne": ["$is_private", False]},
                                        1,
                                        0,
                                    ]
                                }
                            },
                        }
                    }
                ]
            )
        }
        collection_counts = {
            str(stat["_id"]): stat["collection_count"]
            async for stat in collection_collection.aggregate(
                [
                    {
                        "$group": {
                            "_id": "$owner_id",
                            "collection_count": {"$sum": 1},
                        }
                    }
                ]
            )
        }

        users = []
        for user in user_documents:
            user_id = str(user["_id"])
            stats = recipe_stats.get(user_id, {})
            users.append(
                AdminUserStats(
                    id=user_id,
                    first_name=user.get("first_name", ""),
                    last_name=user.get("last_name", ""),
                    email=user.get("email", ""),
                    recipe_count=stats.get("recipe_count", 0),
                    published_recipe_count=stats.get(
                        "published_recipe_count", 0
                    ),
                    draft_recipe_count=stats.get("draft_recipe_count", 0),
                    collection_count=collection_counts.get(user_id, 0),
                )
            )

        return AdminDashboardStats(
            total_users=await users_collection.count_documents({}),
            total_recipes=await recipe_collection.count_documents({}),
            published_recipes=await recipe_collection.count_documents(
                {"is_private": False}
            ),
            draft_recipes=await recipe_collection.count_documents(
                {"is_private": {"$ne": False}}
            ),
            total_collections=await collection_collection.count_documents({}),
            total_saved_recipes=await database["saved_recipes"].count_documents(
                {}
            ),
            users=users,
        )


@strawberry.type
class Mutation(RecipeMutation):
    pass


schema = strawberry.Schema(query=Query, mutation=Mutation)