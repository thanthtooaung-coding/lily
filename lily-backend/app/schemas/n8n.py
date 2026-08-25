import uuid
from typing import Any
from pydantic import BaseModel


class N8nIncidentWebhook(BaseModel):
    incident_id: uuid.UUID
    event_type: str
    data: dict[str, Any] = {}