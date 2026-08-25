from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Lily"
    app_env: str = "development"
    database_url: str = "sqlite+aiosqlite:///./lily.db"
    lily_internal_api_key: str = ""
    n8n_base_url: str = ""
    n8n_incident_webhook_url: str = ""
    n8n_api_key: str = ""
    ai_provider: str = "mock"
    ai_api_key: str = ""
    telegram_bot_token: str = ""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


@lru_cache
def get_settings() -> Settings:
    return Settings()