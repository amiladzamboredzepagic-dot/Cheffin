import asyncio
from getpass import getpass

from pymongo.errors import DuplicateKeyError

from app.database import client, database
from app.security import hash_password


async def main() -> None:
    email = input("Admin email: ").strip().lower()
    password = getpass("Admin password: ")
    password_confirmation = getpass("Confirm admin password: ")

    if not email:
        raise ValueError("Email is required")
    if not password:
        raise ValueError("Password is required")
    if password != password_confirmation:
        raise ValueError("Passwords do not match")

    try:
        await client.admin.command("ping")

        if await database["users"].find_one({"email": email}):
            raise ValueError(f"A user with email {email!r} already exists")

        await database["users"].insert_one(
            {
                "email": email,
                "password": hash_password(password),
                "role": "admin",
            }
        )
    except DuplicateKeyError as error:
        raise ValueError(f"A user with email {email!r} already exists") from error
    finally:
        client.close()

    print(f"Admin account created for {email}")


if __name__ == "__main__":
    asyncio.run(main())
