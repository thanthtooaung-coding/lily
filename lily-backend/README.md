# Lily-Backend

AI-powered incident response and automation backend.

## Architecture

```text
Monitoring / n8n -> FastAPI -> PostgreSQL
                         -> AI analysis abstraction
                         -> simulated action executor
                         -> audit log
```

FastAPI owns incidents, actions, approvals, persistence, and audit history. n8n owns orchestration, AI provider calls, Telegram notifications, escalation, and daily reports.

## Run locally

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload
```

The default development database is SQLite. Set `DATABASE_URL` to PostgreSQL for deployment. OpenAPI is available at `/docs`.

## API

- `POST /api/v1/incidents` creates an incident and asynchronously calls `N8N_INCIDENT_WEBHOOK_URL`.
- `GET/PATCH /api/v1/incidents/{id}` reads or updates an incident.
- `POST /api/v1/incidents/{id}/analyze` runs structured analysis.
- `POST /api/v1/incidents/{id}/actions` creates an action.
- `POST /api/v1/actions/{id}/approve` or `/reject` records human approval.
- `POST /api/v1/actions/{id}/execute` runs the safe simulated executor and requires `X-API-Key`.
- `POST /api/v1/webhooks/n8n/incident` accepts n8n updates and requires `X-API-Key`.
- `GET /health` and `/health/database` provide service checks.

## n8n setup

Configure an n8n Webhook node at the URL in `N8N_INCIDENT_WEBHOOK_URL`. Send the incident payload received from FastAPI to an AI node, require JSON output matching the analysis schema, then call the n8n webhook endpoint with `X-API-Key: LILY_INTERNAL_API_KEY`. Use n8n Telegram nodes for alerts and approval buttons; approved actions call the execute endpoint with the same key.

## Database migrations

```powershell
alembic upgrade head
```

For the hackathon, application startup also creates missing tables automatically.