import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.utils.enums import Category, IncidentStatus, Severity


class IncidentCreate(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    description: str = Field(min_length=1)
    service: str = Field(min_length=1, max_length=255)
    environment: str = Field(min_length=1, max_length=100)
    source: str = Field(default="api", max_length=255)


class IncidentUpdate(BaseModel):
    status: IncidentStatus | None = None
    severity: Severity | None = None
    category: Category | None = None
    impact: str | None = None
    urgency: str | None = None
    recommended_action: str | None = None


class IncidentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    title: str
    description: str
    service: str
    environment: str
    severity: Severity
    status: IncidentStatus
    category: Category | None
    source: str
    impact: str | None
    urgency: str | None
    ai_analysis: dict | None
    recommended_action: str | None
    requires_approval: bool
    created_at: datetime
    updated_at: datetime
    resolved_at: datetime | None


class IncidentListResponse(BaseModel):
    items: list[IncidentResponse]
    page: int
    page_size: int
    total: int


class AnalysisResponse(BaseModel):
    incident_id: uuid.UUID
    severity: Severity
    category: Category
    impact: str
    urgency: str
    recommended_action: str
    requires_approval: bool
    reason: str