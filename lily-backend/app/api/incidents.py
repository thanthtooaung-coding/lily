import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Query, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import require_internal_key
from app.core.config import get_settings
from app.core.database import get_db
from app.models.incident import Incident
from app.schemas.incident import AnalysisResponse, IncidentCreate, IncidentListResponse, IncidentResponse, IncidentUpdate
from app.services.ai_service import AIService
from app.services.audit_service import record_audit
from app.services.n8n_service import N8nService
from app.utils.enums import Category, IncidentStatus, Severity

router = APIRouter(prefix="/api/v1/incidents", tags=["incidents"])


async def get_incident(incident_id: uuid.UUID, session: AsyncSession) -> Incident:
    incident = await session.get(Incident, incident_id)
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    return incident


@router.post("", response_model=IncidentResponse, status_code=status.HTTP_201_CREATED)
async def create_incident(payload: IncidentCreate, background_tasks: BackgroundTasks, session: AsyncSession = Depends(get_db)):
    incident = Incident(**payload.model_dump())
    session.add(incident)
    await session.flush()
    await record_audit(session, incident.id, "INCIDENT_CREATED", {"title": incident.title})
    await session.commit()
    await session.refresh(incident)
    background_tasks.add_task(N8nService(get_settings()).incident_created, incident)
    return incident


@router.get("", response_model=IncidentListResponse)
async def list_incidents(page: int = Query(1, ge=1), page_size: int = Query(20, ge=1, le=100), incident_status: IncidentStatus | None = Query(None, alias="status"), severity: Severity | None = None, category: Category | None = None, service: str | None = None, session: AsyncSession = Depends(get_db)):
    conditions = [*( [Incident.status == incident_status] if incident_status else []), *([Incident.severity == severity] if severity else []), *([Incident.category == category] if category else []), *([Incident.service == service] if service else [])]
    total = await session.scalar(select(func.count()).select_from(Incident).where(*conditions))
    result = await session.scalars(select(Incident).where(*conditions).order_by(Incident.created_at.desc()).offset((page - 1) * page_size).limit(page_size))
    return IncidentListResponse(items=list(result), page=page, page_size=page_size, total=total or 0)


@router.get("/{incident_id}", response_model=IncidentResponse)
async def read_incident(incident_id: uuid.UUID, session: AsyncSession = Depends(get_db)):
    return await get_incident(incident_id, session)


@router.patch("/{incident_id}", response_model=IncidentResponse)
async def update_incident(incident_id: uuid.UUID, payload: IncidentUpdate, session: AsyncSession = Depends(get_db)):
    incident = await get_incident(incident_id, session)
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(incident, key, value)
    await record_audit(session, incident.id, "INCIDENT_UPDATED", payload.model_dump(exclude_unset=True, mode="json"))
    await session.commit()
    await session.refresh(incident)
    return incident


@router.post("/{incident_id}/analyze", response_model=AnalysisResponse)
async def analyze_incident(incident_id: uuid.UUID, session: AsyncSession = Depends(get_db)):
    incident = await get_incident(incident_id, session)
    incident.status = IncidentStatus.ANALYZING
    analysis = await AIService().analyze(incident)
    incident.severity, incident.category = analysis.severity, analysis.category
    incident.impact, incident.urgency = analysis.impact, analysis.urgency
    incident.recommended_action, incident.requires_approval = analysis.recommended_action, analysis.requires_approval
    incident.ai_analysis = analysis.__dict__
    incident.status = IncidentStatus.AWAITING_APPROVAL if analysis.requires_approval else IncidentStatus.OPEN
    await record_audit(session, incident.id, "AI_ANALYSIS_COMPLETED", incident.ai_analysis, "ai")
    await session.commit()
    return AnalysisResponse(incident_id=incident.id, **analysis.__dict__)


@router.post("/{incident_id}/resolve", response_model=IncidentResponse)
async def resolve_incident(incident_id: uuid.UUID, session: AsyncSession = Depends(get_db)):
    incident = await get_incident(incident_id, session)
    incident.status, incident.resolved_at = IncidentStatus.RESOLVED, datetime.now(timezone.utc)
    await record_audit(session, incident.id, "INCIDENT_RESOLVED")
    await session.commit()
    await session.refresh(incident)
    return incident


@router.post("/{incident_id}/close", response_model=IncidentResponse)
async def close_incident(incident_id: uuid.UUID, session: AsyncSession = Depends(get_db)):
    incident = await get_incident(incident_id, session)
    incident.status = IncidentStatus.CLOSED
    await record_audit(session, incident.id, "INCIDENT_CLOSED")
    await session.commit()
    await session.refresh(incident)
    return incident