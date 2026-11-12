import strawberry
from graphql import GraphQLError


def require_auth(info: strawberry.Info) -> dict:
    user = info.context.user
    if not user:
        raise GraphQLError("401: Unauthorized")
    return user


def require_role(info: strawberry.Info, role: str) -> dict:
    user = require_auth(info)
    if user.get("role") != role:
        raise GraphQLError("403: Forbidden")
    return user
