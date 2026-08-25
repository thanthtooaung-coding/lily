import logging

import httpx

from app.core.config import Settings
from app.models.incident import Incident

logger = logging.getLogger(__name__)


class N8nService:
    def __init__(self, settings: Settings):
        self.settings = settings

    async def incident_created(self, incident: Incident) -> None:
        if not self.settings.n8n_incident_webhook_url:
            return
        payload = {"event": "incident.created", "incident": {"id": str(incident.id), "title": incident.title, "description": incident.description, "service": incident.service, "environment": incident.environment, "severity": incident.severity.value, "status": incident.status.value}}
        headers = {"X-API-Key": self.settings.n8n_api_key} if self.settings.n8n_api_key else {}
        try:
            async with httpx.AsyncClient(timeout=10) as client:
                response = await client.post(self.settings.n8n_incident_webhook_url, json=payload, headers=headers)
                response.raise_for_status()
        except httpx.HTTPError:
            logger.exception("n8n incident webhook failed", extra={"incident_id": str(incident.id)})