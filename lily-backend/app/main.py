from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.core.database import init_db
from app.core.database import engine
from sqlalchemy import text
from app.api.actions import router as actions_router
from app.api.incidents import router as incidents_router
from app.api.webhooks import router as webhooks_router


@asynccontextmanager
async def lifespan(_: FastAPI):
    await init_db()
    yield


app = FastAPI(title="Lily", description="AI-powered incident response platform", version="1.0.0", lifespan=lifespan)
app.include_router(incidents_router)
app.include_router(actions_router)
app.include_router(webhooks_router)


@app.get("/health", tags=["health"])
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "lily-backend"}


@app.get("/health/database", tags=["health"])
async def database_health() -> dict[str, str]:
    async with engine.connect() as connection:
        await connection.execute(text("SELECT 1"))
    return {"status": "ok", "service": "lily-database"}