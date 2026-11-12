import strawberry
from app.graphql.auth import require_auth, require_role
from app.recipes.schema import Mutation as RecipeMutation

@strawberry.type
class Query:
    @strawberry.field
    def admin_data(self, info: strawberry.Info) -> str:
        require_role(info, "admin")
        return "Confidential Admin System Metrics"


@strawberry.type
class Mutation(RecipeMutation):
    pass


schema = strawberry.Schema(query=Query, mutation=Mutation)