import uuid
from typing import Any
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.audit_log import AuditLog


async def record_audit(session: AsyncSession, incident_id: uuid.UUID, action: str, metadata: dict[str, Any] | None = None, source: str = "api") -> None:
    session.add(AuditLog(incident_id=incident_id, action=action, source=source, metadata_=metadata))