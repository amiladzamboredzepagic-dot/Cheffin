from pathlib import Path
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = BASE_DIR / ".env"

class Settings(BaseSettings):
    mongo_uri: str = Field(default="mongodb://localhost:27017")
    database_name: str = Field(default="cheffin")

    model_config = SettingsConfigDict(
        env_file=ENV_PATH,
        env_file_encoding="utf-8",
        extra="ignore"
    )

    @property
    def mongo_uri_str(self) -> str:
        return str(self.mongo_uri)

    @property
    def database_name_str(self) -> str:
        return str(self.database_name)

settings = Settings()
