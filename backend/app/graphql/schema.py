import strawberry
from app.graphql.auth import require_role
from app.recipes.schema import Mutation as RecipeMutation
from app.recipes.schema import Query as RecipeQuery

@strawberry.type
class Query(RecipeQuery):
    @strawberry.field
    def admin_data(self, info: strawberry.Info) -> str:
        require_role(info, "admin")
        return "Confidential Admin System Metrics"


@strawberry.type
class Mutation(RecipeMutation):
    pass


schema = strawberry.Schema(query=Query, mutation=Mutation)