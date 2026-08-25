from fastapi import Header, HTTPException, status
from app.core.config import get_settings


async def require_internal_key(x_api_key: str | None = Header(default=None)) -> None:
    expected = get_settings().lily_internal_api_key
    if expected and x_api_key != expected:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid API key")