import strawberry

def require_auth(info: strawberry.Info) -> dict:
    user = info.context.user
    if not user:
        raise Exception("401: Unauthorized")
    return user

def require_role(info: strawberry.Info, role: str) -> dict:
    user = require_auth(info)
    if user.get("role") != role:
        raise Exception("403: Forbidden")
    return user

@strawberry.type
class Query:
    @strawberry.field
    def admin_data(self, info: strawberry.Info) -> str:
        require_role(info, "admin")
        return "Confidential Admin System Metrics"

schema = strawberry.Schema(query=Query)