import os

os.environ["DATABASE_URL"] = "sqlite+aiosqlite:///./test_lily.db"
os.environ["LILY_INTERNAL_API_KEY"] = "test-key"

import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.mark.asyncio
async def test_incident_approval_execution_flow():
    async with app.router.lifespan_context(app):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            created = await client.post("/api/v1/incidents", json={
                "title": "Payment API latency increased",
                "description": "Response time increased by 300%",
                "service": "payment-api",
                "environment": "production",
                "source": "monitoring",
            })
            assert created.status_code == 201
            incident_id = created.json()["id"]

            analyzed = await client.post(f"/api/v1/incidents/{incident_id}/analyze")
            assert analyzed.status_code == 200
            assert analyzed.json()["requires_approval"] is True

            action = await client.post(f"/api/v1/incidents/{incident_id}/actions", json={
                "action_type": "RESTART_SERVICE", "description": "Restart payment-api"
            })
            assert action.status_code == 201
            action_id = action.json()["id"]

            approved = await client.post(f"/api/v1/actions/{action_id}/approve", json={"comment": "Approved"})
            assert approved.status_code == 200
            executed = await client.post(f"/api/v1/actions/{action_id}/execute", headers={"X-API-Key": "test-key"})
            assert executed.status_code == 200
            assert executed.json()["status"] == "SUCCESS"

            details = await client.get(f"/api/v1/incidents/{incident_id}")
            assert details.json()["status"] == "RESOLVED"


@pytest.mark.asyncio
async def test_n8n_webhook_requires_api_key():
    async with app.router.lifespan_context(app):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.post("/api/v1/webhooks/n8n/incident", json={
                "incident_id": "00000000-0000-0000-0000-000000000000",
                "event_type": "AI_ANALYSIS_COMPLETED",
                "data": {},
            })
            assert response.status_code == 401