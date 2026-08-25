"""create Lily incident response tables"""
from alembic import op
from sqlalchemy import Column, DateTime, ForeignKey, JSON, String, Table, Text, Boolean, Enum
import sqlalchemy as sa
from app.utils.enums import ActionStatus, ActionType, ApprovalStatus, Category, IncidentStatus, Severity

revision = "0001_initial"
down_revision = None
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.create_table("incidents", Column("id", String(36), primary_key=True), Column("title", String(255), nullable=False), Column("description", Text, nullable=False), Column("service", String(255), nullable=False), Column("environment", String(100), nullable=False), Column("severity", Enum(Severity), nullable=False), Column("status", Enum(IncidentStatus), nullable=False), Column("category", Enum(Category)), Column("source", String(255), nullable=False), Column("impact", Text), Column("urgency", String(50)), Column("ai_analysis", JSON), Column("recommended_action", Text), Column("requires_approval", Boolean, nullable=False, server_default=sa.false()), Column("created_at", DateTime(timezone=True), server_default=sa.func.now()), Column("updated_at", DateTime(timezone=True), server_default=sa.func.now()), Column("resolved_at", DateTime(timezone=True)))
    op.create_table("actions", Column("id", String(36), primary_key=True), Column("incident_id", String(36), ForeignKey("incidents.id"), nullable=False), Column("action_type", Enum(ActionType), nullable=False), Column("description", Text, nullable=False), Column("status", Enum(ActionStatus), nullable=False), Column("requested_by", String(255)), Column("approved_by", String(255)), Column("started_at", DateTime(timezone=True)), Column("completed_at", DateTime(timezone=True)), Column("result", Text), Column("error_message", Text))
    op.create_table("approvals", Column("id", String(36), primary_key=True), Column("incident_id", String(36), ForeignKey("incidents.id"), nullable=False), Column("action_id", String(36), ForeignKey("actions.id"), nullable=False), Column("status", Enum(ApprovalStatus), nullable=False), Column("requested_at", DateTime(timezone=True), server_default=sa.func.now()), Column("responded_at", DateTime(timezone=True)), Column("responded_by", String(255)), Column("comment", Text))
    op.create_table("audit_logs", Column("id", String(36), primary_key=True), Column("incident_id", String(36), ForeignKey("incidents.id"), nullable=False), Column("action", String(100), nullable=False), Column("actor", String(255), nullable=False), Column("source", String(100), nullable=False), Column("metadata", JSON), Column("created_at", DateTime(timezone=True), server_default=sa.func.now()))
    op.create_table("notifications", Column("id", String(36), primary_key=True), Column("incident_id", String(36), ForeignKey("incidents.id"), nullable=False), Column("channel", String(50), nullable=False), Column("status", String(50), nullable=False), Column("message", Text, nullable=False), Column("sent_at", DateTime(timezone=True)), Column("created_at", DateTime(timezone=True), server_default=sa.func.now()))

def downgrade() -> None:
    for table in ("notifications", "audit_logs", "approvals", "actions", "incidents"):
        op.drop_table(table)