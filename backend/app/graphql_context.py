from typing import Any
from fastapi import Request
from strawberry.fastapi import BaseContext
from app.security import decode_access_token


def _authenticate(request: Request | None) -> dict[str, Any] | None:
    if request is None:
        return None

    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return None

    token = auth_header.split(" ")[1]
    return decode_access_token(token)


class GraphQLContext(BaseContext):
    def __init__(self, request: Request | None = None):
        super().__init__()
        self.user = _authenticate(request)