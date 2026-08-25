import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, Index, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.types import JSON
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.utils.enums import Category, IncidentStatus, Severity

JSON_TYPE = JSON().with_variant(JSONB, "postgresql")


class Incident(Base):
    __tablename__ = "incidents"
    __table_args__ = (Index("ix_incidents_filters", "status", "severity", "service", "created_at"),)

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)
    service: Mapped[str] = mapped_column(String(255))
    environment: Mapped[str] = mapped_column(String(100))
    severity: Mapped[Severity] = mapped_column(Enum(Severity), default=Severity.MEDIUM)
    status: Mapped[IncidentStatus] = mapped_column(Enum(IncidentStatus), default=IncidentStatus.OPEN)
    category: Mapped[Category | None] = mapped_column(Enum(Category), nullable=True)
    source: Mapped[str] = mapped_column(String(255))
    impact: Mapped[str | None] = mapped_column(Text)
    urgency: Mapped[str | None] = mapped_column(String(50))
    ai_analysis: Mapped[dict | None] = mapped_column(JSON_TYPE)
    recommended_action: Mapped[str | None] = mapped_column(Text)
    requires_approval: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    resolved_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))