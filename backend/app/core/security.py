from datetime import datetime, timedelta, timezone
from typing import Any, Literal

import jwt
from pwdlib import PasswordHash
from app.core.config import settings

SECRET_KEY: str = settings.jwt_secret or ""
if len(SECRET_KEY.encode("utf-8")) < 32:
    raise RuntimeError("JWT_SECRET must be configured with at least 32 bytes")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_DAYS = 7

pwd_context = PasswordHash.recommended()


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict[str, Any]) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire, "type": "access"})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(data: dict[str, Any]) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "type": "refresh"})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_token(
    token: str, expected_type: Literal["access", "refresh"]
) -> dict[str, Any] | None:
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
            options={"verify_exp": True}
        )
    except jwt.PyJWTError:
        return None

    if payload.get("type") != expected_type:
        return None

    return payload


def decode_access_token(token: str) -> dict[str, Any] | None:
    return decode_token(token, "access")


def decode_refresh_token(token: str) -> dict[str, Any] | None:
    return decode_token(token, "refresh")