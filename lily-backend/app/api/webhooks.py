from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import require_internal_key
from app.core.database import get_db
from app.models.incident import Incident
from app.schemas.n8n import N8nIncidentWebhook
from app.services.audit_service import record_audit
from app.utils.enums import Category, Severity

router = APIRouter(prefix="/api/v1/webhooks/n8n", tags=["webhooks"], dependencies=[Depends(require_internal_key)])


@router.post("/incident")
async def receive_incident_update(payload: N8nIncidentWebhook, session: AsyncSession = Depends(get_db)):
    incident = await session.get(Incident, payload.incident_id)
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    allowed = {"severity", "category", "impact", "urgency", "recommended_action", "requires_approval"}
    for key, value in payload.data.items():
        if key in allowed:
            if key == "severity":
                value = Severity(value)
            elif key == "category":
                value = Category(value)
            setattr(incident, key, value)
    await record_audit(session, incident.id, payload.event_type, payload.data, "n8n")
    await session.commit()
    return {"success": True, "incident_id": str(incident.id), "event_type": payload.event_type}


@router.get("/ping")
async def webhook_ping() -> dict[str, str]:
    return {"status": "ok"}