from fastapi import APIRouter, Response, Request, HTTPException, status, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from .database import get_database
from .security import create_access_token, create_refresh_token, decode_token, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
async def login(credentials: dict, response: Response, db: AsyncIOMotorDatabase = Depends(get_database)):
    user = await db["users"].find_one({"email": credentials["email"]})
    if not user or not verify_password(credentials["password"], user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token_payload = {"sub": str(user["_id"]), "role": user.get("role", "user")}
    access_token = create_access_token(token_payload)
    refresh_token = create_refresh_token(token_payload)

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="lax",
        path="/auth/refresh",
        max_age=7 * 86400
    )

    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/refresh")
async def refresh_token(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="Refresh token missing")

    payload = decode_token(token)
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    new_access_token = create_access_token({"sub": payload["sub"], "role": payload["role"]})
    return {"access_token": new_access_token}

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(key="refresh_token", path="/auth/refresh")
    return {"message": "Logged out successfully"}