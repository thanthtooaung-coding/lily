import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.utils.enums import ActionStatus, ActionType


class ActionCreate(BaseModel):
    action_type: ActionType
    description: str = Field(min_length=1)
    requested_by: str | None = None


class ActionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    incident_id: uuid.UUID
    action_type: ActionType
    description: str
    status: ActionStatus
    requested_by: str | None
    approved_by: str | None
    started_at: datetime | None
    completed_at: datetime | None
    result: str | None
    error_message: str | None