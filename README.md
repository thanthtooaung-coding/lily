# ✦ LILY — AI Incident Response & Autonomous Remediation Platform

[![React](https://img.shields.io/badge/Frontend-React_19_+_TypeScript_+_Vite-61DAFB?style=for-the-badge&logo=react)](lily-web/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI_+_Python_3.11-009688?style=for-the-badge&logo=fastapi)](lily-backend/)
[![n8n](https://img.shields.io/badge/Orchestration-n8n_Workflows-EA4B71?style=for-the-badge&logo=n8n)](https://n8n.io/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Telegram](https://img.shields.io/badge/Alerts-Telegram_Bot-24A1DE?style=for-the-badge&logo=telegram)](https://telegram.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

**Lily** is an autonomous AI-powered incident management and automated remediation platform. It continuously monitors cloud services, correlates telemetry and traces using AI reasoning, formulates actionable remediation proposals, gates critical actions behind human-in-the-loop governance, and orchestrates multi-step execution pipelines with **n8n** and **FastAPI** while delivering instant **Telegram** notifications to on-call engineers.

---

## 💡 Quick Overview for Everyone (Plain English)

> Think of **Lily** as a **smart digital paramedic** for cloud applications and websites:
>
> 1. 🚨 **An Anomaly Happens**: A checkout service or database gets slow.
> 2. 🧠 **Lily Diagnoses**: Lily's AI reads telemetry and diagnoses the root cause with **92%+ certainty** (*"Stale connection pool leak on worker pods"*).
> 3. 🛡️ **Human Safety Gate**: Lily formulates the cure and asks the on-call engineer: *"Should I restart the service and cycle the pool?"*
> 4. ⚡ **Autonomous Execution**: The engineer taps **Approve**, and Lily's automated workflow cures the issue in seconds, updates the dashboard to **Resolved ✓**, and texts the team on Telegram!

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend (lily-web)                │
│    Vite • TypeScript • Tailwind CSS • TanStack Query • Zod  │
└──────────────────────────────┬──────────────────────────────┘
                               │ REST API (JSON / Bearer Auth)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                  FastAPI Backend (lily-backend)             │
│    Incident Lifecycle • Audit Trail • Role-Based Security    │
└──────┬───────────────────────┬───────────────────────┬──────┘
       │                       │                       │
       ▼                       ▼                       ▼
┌──────────────┐        ┌──────────────┐        ┌──────────────┐
│  PostgreSQL  │        │  AI Engine   │        │  n8n Engine  │
│  State Store │        │  LLM Triage  │        │Orchestration │
└──────────────┘        └──────────────┘        └──────┬───────┘
                                                       │
                                                       ├── 📱 Telegram Bot
                                                       ├── 🔔 Notifications
                                                       └── ⚡ Automated Actions
```

### 🔒 Security Guarantee
All sensitive API credentials, LLM keys, n8n webhook secrets, database connection strings, and Telegram bot tokens reside exclusively inside the backend environment. The frontend interacts strictly with FastAPI endpoints.

---

## 📂 Repository Structure

```
lily/
├── lily-backend/              # Python FastAPI backend service
│   ├── app/
│   │   ├── api/               # Incidents, actions, webhooks & dependencies
│   │   ├── core/              # Config, settings, and database session
│   │   ├── models/            # SQLAlchemy models (Incident, Action, Approval, Audit)
│   │   ├── schemas/           # Pydantic schemas for validation
│   │   ├── services/          # AI Service, n8n Service, Action Executor, Audit Log
│   │   └── utils/             # Enums and helpers
│   ├── alembic/               # Database migrations
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── requirements.txt
│
└── lily-web/                  # Modern React enterprise frontend
    ├── src/
    │   ├── api/               # Typed API client & realistic mock simulation engine
    │   ├── components/        # Layout, Dashboard, Incidents, Approvals, Automation, UI
    │   ├── context/           # ToastContext & state providers
    │   ├── hooks/             # TanStack Query custom hooks
    │   ├── pages/             # Dashboard, Incidents, Details, Approvals, Actions, Guide
    │   ├── types/             # Strict TypeScript domain models
    │   ├── utils/             # Date formatting, duration, severity & status styles
    │   ├── App.tsx
    │   └── index.css          # Tailwind design tokens & keyframe micro-animations
    ├── USER_MANUAL.md         # Comprehensive operations handbook
    └── package.json
```

---

## 🚀 Quick Start Guide

You can run both the frontend and backend locally or run the frontend standalone in mock simulation mode.

### Option A: Running with Docker Compose (Full Stack)

```bash
cd lily-backend
docker-compose up -d
```

---

### Option B: Local Development Setup

#### 1. Start the Backend (`lily-backend`)

```bash
cd lily-backend

# Create and activate virtual environment
python -m venv .venv
# On Windows:
.\.venv\Scripts\Activate.ps1
# On Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env

# Run FastAPI with auto-reload (available on http://localhost:8000)
uvicorn app.main:app --reload
```

*Interactive Swagger API documentation is available at [http://localhost:8000/docs](http://localhost:8000/docs).*

#### 2. Start the Frontend (`lily-web`)

```bash
cd lily-web

# Install dependencies
pnpm install # or npm install

# Configure environment
cp .env.example .env

# Start Vite dev server (available on http://localhost:5173)
pnpm dev # or npm run dev
```

---

## 🎯 12-Step Hackathon Demo Walkthrough

Lily is built to demonstrate the complete, deterministic autonomous incident lifecycle:

| Step | Phase | Description |
|---|---|---|
| **01** | **Dashboard** | View real-time KPIs: 12 open incidents, 2 critical, 48 resolved today, and MTTR trend. |
| **02** | **Declare Incident** | Click `+ Create Incident` (e.g. *"Payment API latency increased >3500ms"*). |
| **03** | **Ingestion** | Incident is ingested into FastAPI and enters the `ANALYZING` state with active pulse. |
| **04** | **AI Reasoning** | Lily AI correlates telemetry and outputs root cause synthesis with **92% confidence**. |
| **05** | **Governance Gate** | Status transitions to `AWAITING_APPROVAL` with proposed remediation. |
| **06** | **Approvals Hub** | Operator opens the **Approvals** page and inspects the risk level and justification. |
| **07** | **Operator Approval** | Operator clicks `Approve Action` with an optional audit note. |
| **08** | **n8n Orchestration** | FastAPI triggers n8n webhook workflow for multi-step automation. |
| **09** | **Action Execution** | FastAPI worker runs the container restart and connection pool cycling. |
| **10** | **Telegram Alert** | Instant Markdown alert delivered to the team's Telegram channel (`#incidents-prod`). |
| **11** | **Incident Resolved** | Telemetry normalizes (<120ms); incident status transitions to `RESOLVED ✓`. |
| **12** | **Metrics Updated** | Dashboard counters increment and MTTR reduction graphs update live. |

---

## ⚙️ Configuration & Dual-Mode Engine

The frontend includes a **dual-mode engine** allowing frictionless demonstrations without requiring a live database connection:

Edit `lily-web/.env`:

```env
# 🟢 Mode 1: Local Mock Mode (Self-contained demo, zero backend required)
VITE_USE_MOCK_DATA=true

# 🔵 Mode 2: Live Backend Mode (Connected to FastAPI + PostgreSQL + n8n)
VITE_USE_MOCK_DATA=false
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

---

## 📘 Documentation & Manuals

- **Interactive User Manual**: Visit [http://localhost:5173/guide](http://localhost:5173/guide) inside the web app for interactive walkthroughs, non-technical explanations, and playbooks.
- **Frontend Guide**: [lily-web/README.md](lily-web/README.md)
- **Detailed Handbook**: [lily-web/USER_MANUAL.md](lily-web/USER_MANUAL.md)
- **Backend Architecture**: [lily-backend/README.md](lily-backend/README.md)

---

## 👥 Authors & License

Developed for the AI Incident Response & Automation Hackathon.  
Distributed under the **MIT License**.
