import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import require_internal_key
from app.core.database import get_db
from app.models.action import Action
from app.models.approval import Approval
from app.models.incident import Incident
from app.schemas.action import ActionCreate, ActionResponse
from app.schemas.approval import ApprovalDecision, ApprovalResponse
from app.services.action_service import SimulatedActionExecutor
from app.services.audit_service import record_audit
from app.utils.enums import ActionStatus, ApprovalStatus, IncidentStatus

router = APIRouter(prefix="/api/v1", tags=["actions"])


async def get_action(action_id: uuid.UUID, session: AsyncSession) -> Action:
    action = await session.get(Action, action_id)
    if not action:
        raise HTTPException(status_code=404, detail="Action not found")
    return action


@router.post("/incidents/{incident_id}/actions", response_model=ActionResponse, status_code=201)
async def create_action(incident_id: uuid.UUID, payload: ActionCreate, session: AsyncSession = Depends(get_db)):
    incident = await session.get(Incident, incident_id)
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    action = Action(incident_id=incident_id, **payload.model_dump())
    session.add(action)
    await session.flush()
    await record_audit(session, incident_id, "ACTION_CREATED", {"action_id": str(action.id)})
    if incident.requires_approval:
        session.add(Approval(incident_id=incident_id, action_id=action.id))
        await record_audit(session, incident_id, "APPROVAL_REQUESTED", {"action_id": str(action.id)})
    await session.commit()
    await session.refresh(action)
    return action


async def decide(action_id: uuid.UUID, payload: ApprovalDecision, approved: bool, session: AsyncSession):
    action = await get_action(action_id, session)
    approval = await session.scalar(
        select(Approval).where(Approval.action_id == action_id, Approval.status == ApprovalStatus.PENDING)
    )
    if not approval:
        raise HTTPException(status_code=409, detail="No pending approval for action")
    approval.status = ApprovalStatus.APPROVED if approved else ApprovalStatus.REJECTED
    approval.responded_at = datetime.now(timezone.utc)
    approval.responded_by = payload.responded_by
    approval.comment = payload.comment
    action.status = ActionStatus.APPROVED if approved else ActionStatus.REJECTED
    await record_audit(session, action.incident_id, "ACTION_APPROVED" if approved else "ACTION_REJECTED", {"action_id": str(action.id)}, payload.responded_by)
    await session.commit()
    await session.refresh(action)
    return action


@router.post("/actions/{action_id}/approve", response_model=ActionResponse)
async def approve_action(action_id: uuid.UUID, payload: ApprovalDecision, session: AsyncSession = Depends(get_db)):
    return await decide(action_id, payload, True, session)


@router.post("/actions/{action_id}/reject", response_model=ActionResponse)
async def reject_action(action_id: uuid.UUID, payload: ApprovalDecision, session: AsyncSession = Depends(get_db)):
    return await decide(action_id, payload, False, session)


@router.get("/approvals/pending", response_model=list[ApprovalResponse])
async def pending_approvals(session: AsyncSession = Depends(get_db)):
    result = await session.scalars(select(Approval).where(Approval.status == ApprovalStatus.PENDING).order_by(Approval.requested_at))
    return list(result)


@router.post("/actions/{action_id}/execute", response_model=ActionResponse, dependencies=[Depends(require_internal_key)])
async def execute_action(action_id: uuid.UUID, session: AsyncSession = Depends(get_db)):
    action = await get_action(action_id, session)
    if action.status not in (ActionStatus.APPROVED, ActionStatus.PENDING):
        raise HTTPException(status_code=409, detail="Action is not executable")
    incident = await session.get(Incident, action.incident_id)
    action.status = ActionStatus.RUNNING
    action.started_at = datetime.now(timezone.utc)
    incident.status = IncidentStatus.IN_PROGRESS
    await session.flush()
    result = await SimulatedActionExecutor().execute(action, incident.service)
    action.status = ActionStatus.SUCCESS if result.success else ActionStatus.FAILED
    action.result = result.message if result.success else None
    action.error_message = None if result.success else result.message
    action.completed_at = datetime.now(timezone.utc)
    if result.success:
        incident.status = IncidentStatus.RESOLVED
        incident.resolved_at = action.completed_at
    await record_audit(session, incident.id, "ACTION_EXECUTED", {"action_id": str(action.id), "success": result.success})
    await session.commit()
    await session.refresh(action)
    return action
