from datetime import datetime
from pydantic import BaseModel, ConfigDict
from app.utils.enums import ApprovalStatus


class ApprovalDecision(BaseModel):
    comment: str | None = None
    responded_by: str = "operator"


class ApprovalResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    incident_id: str
    action_id: str
    status: ApprovalStatus
    requested_at: datetime
    responded_at: datetime | None
    responded_by: str | None
    comment: str | None