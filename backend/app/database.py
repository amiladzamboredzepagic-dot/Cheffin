from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

mongo_uri: str = settings.mongo_uri_str
db_name: str = settings.database_name_str

client = AsyncIOMotorClient(mongo_uri)
database = client[db_name]

def get_database():
    return database