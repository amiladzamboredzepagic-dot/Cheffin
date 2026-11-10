from fastapi import APIRouter, Depends, HTTPException, Request, Response
from motor.motor_asyncio import AsyncIOMotorDatabase
from pydantic import BaseModel, ConfigDict, Field, field_validator
from pymongo.errors import DuplicateKeyError
from pymongo.collation import Collation

from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_refresh_token,
    hash_password,
    verify_password,
)
from app.db.database import get_database

router = APIRouter(prefix="/auth", tags=["auth"])
EMAIL_COLLATION = Collation(locale="en", strength=2)


class LoginCredentials(BaseModel):
    email: str
    password: str


class RegistrationCredentials(BaseModel):
    model_config = ConfigDict(extra="forbid")

    first_name: str = Field(min_length=1, max_length=80)
    last_name: str = Field(min_length=1, max_length=80)
    email: str = Field(
        min_length=3,
        max_length=320,
        pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$",
    )
    password: str = Field(min_length=8, max_length=128)

    @field_validator("email", mode="before")
    @classmethod
    def normalize_email(cls, value: object) -> object:
        return value.strip().lower() if isinstance(value, str) else value

    @field_validator("first_name", "last_name")
    @classmethod
    def normalize_name(cls, value: str) -> str:
        normalized = value.strip()
        if not normalized:
            raise ValueError("Name must not be blank")
        return normalized

    @field_validator("password")
    @classmethod
    def validate_password_strength(cls, value: str) -> str:
        if not any(character.isupper() for character in value):
            raise ValueError("Password must contain an uppercase letter")
        if not any(
            not character.isalnum() and not character.isspace()
            for character in value
        ):
            raise ValueError("Password must contain a special symbol")
        return value


def create_auth_response(
    user: dict,
    request: Request,
    response: Response,
) -> dict[str, str]:
    first_name = user.get("first_name", "")
    last_name = user.get("last_name", "")
    token_payload = {
        "sub": str(user["_id"]),
        "role": user.get("role", "user"),
        "first_name": first_name,
        "last_name": last_name,
    }
    access_token = create_access_token(token_payload)
    refresh_token = create_refresh_token(token_payload)

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=request.url.scheme == "https",
        samesite="lax",
        path="/auth/refresh",
        max_age=7 * 86400,
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "first_name": first_name,
        "last_name": last_name,
    }


@router.post("/login")
async def login(
    credentials: LoginCredentials,
    request: Request,
    response: Response,
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    email = credentials.email.strip()
    user = await db["users"].find_one(
        {"email": email},
        collation=EMAIL_COLLATION,
    )
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return create_auth_response(user, request, response)


@router.post("/register", status_code=201)
async def register(
    credentials: RegistrationCredentials,
    request: Request,
    response: Response,
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    email = credentials.email
    user = {
        "first_name": credentials.first_name,
        "last_name": credentials.last_name,
        "email": email,
        "password": hash_password(credentials.password),
        "role": "chef",
    }

    try:
        result = await db["users"].insert_one(user)
    except DuplicateKeyError as error:
        raise HTTPException(
            status_code=409,
            detail="An account with this email already exists",
        ) from error

    user["_id"] = result.inserted_id
    return create_auth_response(user, request, response)


@router.post("/refresh")
async def refresh_token(request: Request):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="Refresh token missing")

    payload = decode_refresh_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    new_access_token = create_access_token(
        {
            "sub": payload["sub"],
            "role": payload.get("role", "user"),
            "first_name": payload.get("first_name", ""),
            "last_name": payload.get("last_name", ""),
        }
    )
    return {
        "access_token": new_access_token,
        "first_name": payload.get("first_name", ""),
        "last_name": payload.get("last_name", ""),
    }


@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(key="refresh_token", path="/auth/refresh")
    return {"message": "Logged out successfully"}