# 📘 LILY Platform — User Manual & Operations Guide

> **Lily**: AI-Powered Incident Response & Autonomous Remediation Platform

---

## 🌱 Quick Start for Non-Technical Users (Plain English)

### 💡 What is Lily in 30 Seconds?
Imagine your online business as a busy hospital. When a patient (e.g. your checkout or login service) feels sick or gets slow:
1. **The Alarm Sounds**: Lily detects the problem instantly.
2. **Lily the Doctor Diagnoses**: Using AI, Lily checks the patient charts and finds the exact cause with **92% certainty**.
3. **Lily Asks for Permission**: Lily asks the supervisor (you!): *"Should I give this medicine?"*
4. **Automated Cure**: You click **Approve**, and Lily's automated robot carries out the fix in seconds, cures the patient, and texts the team on Telegram!

---

### 🚦 Traffic Light Colors: What They Mean
- 🔴 **RED (Critical)**: Urgent problem. Something is broken for customers right now.
- 🟠 **ORANGE (High)**: System is slow or having errors. Needs fast attention.
- 🟡 **YELLOW (Awaiting Approval)**: Lily has formulated the exact fix and is waiting for you to click "Approve".
- 🔵 **BLUE (Analyzing / Running)**: Lily is actively diagnosing or carrying out the fix.
- 🟢 **GREEN (Resolved)**: All fixed! Everything is healthy and running normally again.

---

### 📖 Jargon Buster (Everyday Dictionary)
- **Incident**: A computer glitch, crash, or slowdown (e.g. payment page taking 5 seconds to load).
- **AI Confidence (e.g. 92%)**: How sure Lily is that it found the right root cause and the right fix.
- **Remediation**: The "cure" or action taken to solve the problem (like restarting the server or cleaning memory).
- **Approval**: A human safety check so the computer doesn't make any unexpected changes without your OK.
- **MTTR (Resolution Time)**: How many minutes it takes to fix a broken service. Lily reduces this from hours to seconds!

---

### 🎯 How to Use Lily in 3 Easy Steps
1. **Look at the Dashboard**: If everything is Green, all systems are operational.
2. **Review Pending Approvals**: If there is a Yellow badge on the left menu under **Approvals**, click it, read the summary, and click **Approve Action**.
3. **Watch It Cure the Issue**: Lily will carry out the fix automatically and mark the issue as **Resolved**.

---

## 🌟 1. Platform Technical Overview

**Lily** is an autonomous incident response platform designed for modern DevOps and SRE teams. It bridges telemetry monitoring, AI diagnostic reasoning, and automated workflow execution to reduce **Mean Time to Resolution (MTTR)** from hours to seconds while maintaining safety through human-in-the-loop governance.

### Core Value Proposition:
1. **Instant Diagnostic Triaging**: Replaces manual log digging by correlating metrics, traces, and commit histories to isolate root causes with confidence scoring.
2. **Safe Automated Remediation**: AI proposes targeted remediations (service cycling, cache flushing, pod autoscaling, connection cleanup). High-risk operations are held for human operator confirmation.
3. **Multi-Engine Orchestration**: Coordinated via **FastAPI** and **n8n** with instant **Telegram** notifications.

---

## 🏗️ 2. Architecture & Security Model

```
┌──────────────────────────────────────────────────────────┐
│                   React Frontend                         │
│   (Vite + TypeScript + Tailwind + TanStack Query)        │
└────────────────────────────┬─────────────────────────────┘
                             │ REST API (Bearer JWT / Token)
                             ▼
┌──────────────────────────────────────────────────────────┐
│                  FastAPI Backend                         │
│  - Incident Lifecycle Controller                         │
│  - Audit Logging & Role-Based Access Control             │
│  - Secret Management & Execution Engine                  │
└──────┬─────────────────────┬──────────────────────┬──────┘
       │                     │                      │
       ▼                     ▼                      ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  PostgreSQL  │      │  AI Engine   │      │  n8n Engine  │
│  State Store │      │  LLM Triage  │      │ Orchestration│
└──────────────┘      └──────────────┘      └──────┬───────┘
                                                   │
                                                   ├── Telegram Bot
                                                   ├── Notifications
                                                   └── Webhooks
```

> **Security Rule:** All secrets (Telegram bot tokens, n8n webhook secrets, LLM API keys, database credentials) reside strictly on the backend. The frontend communicates exclusively via authenticated REST API endpoints.

---

## 🚀 3. Step-by-Step Incident Lifecycle Walkthrough

### Step 1: Open Dashboard
- **URL**: `/dashboard`
- **What to look for**:
  - Top KPI cards: **Open Incidents**, **Critical Incidents**, **Resolved Today**, and **Avg Resolution Time**.
  - **Incident Activity Chart**: Real-time telemetry comparing incidents created vs resolved over 24H, 7D, or 30D.
  - **System Status Card**: Real-time health check for Lily API, PostgreSQL, AI Engine, n8n, and Telegram.

---

### Step 2: Declare / Ingest Incident
- **Action**: Click `+ Create Incident` (in topbar or incidents page).
- **Example Inputs**:
  - **Title**: `Payment API latency increased (>3500ms)`
  - **Description**: `Payment transactions experiencing severe p99 latency spikes exceeding 3.5s in production.`
  - **Service**: `payment-api`
  - **Environment**: `production`
  - **Severity**: `HIGH`
- **Result**: Incident is ingested into the system and immediately enters the `ANALYZING` state.

---

### Step 3: Autonomous AI Diagnosis
- **What happens**:
  - Lily AI correlates APM trace logs, recent container deployments, and database connection metrics.
  - Generates a **Diagnostic Confidence Score** (e.g. `92%`).
  - Summarizes the root cause: *"Stale HTTP client connection pool saturation on worker pods."*
  - Recommends an action: *"Restart payment-api and flush connection pool."*
- **Status Change**: Transitions from `ANALYZING` → `AWAITING_APPROVAL`.

---

### Step 4: Operator Review & Approval
- **URL**: `/approvals`
- **Action**:
  - Open the **Pending Approvals** tab.
  - Review the proposed remediation, justification reason, and `MEDIUM RISK` assessment.
  - Click **Approve Action**.
  - *(Optional)* Add an audit comment (e.g. *"Approved restart during traffic dip"*).
- **Result**: Lily registers the operator sign-off and dispatches the execution request.

---

### Step 5: Automated Orchestration via n8n & FastAPI
- **URL**: `/automation` & `/actions`
- **What happens**:
  - FastAPI calls the n8n webhook trigger.
  - n8n coordinates the execution pipeline.
  - FastAPI worker runs the container restart and connection pool cycling.
  - Status displays as `RUNNING` with an animated blue indicator in the **Actions** log.

---

### Step 6: Telegram Alert & Auto-Verification
- **What happens**:
  - n8n pushes an alert directly to the team's Telegram on-call channel (`#incidents-prod`).
  - Lily's verifier checks service health. Latency drops below 120ms.
  - Incident transitions to `RESOLVED ✓`.
  - Dashboard counters update automatically.

---

## 💻 4. Page by Page User Guide

### 📊 Dashboard (`/dashboard`)
- **Metric Cards**: Real-time snapshot of active disruptions and resolution velocity.
- **Activity AreaChart**: Visualizes workload balance with smooth cubic bezier gradients.
- **AI Overview**: Displays autonomous triage accuracy and most impacted microservices.
- **Recent Incidents**: Quick-access list to jump directly into active investigations.

### ⚠️ Incidents (`/incidents`)
- **Filters**: Filter by title search, severity (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`), status, or microservice.
- **View Toggle**: Switch between compact tabular view and responsive card grid.
- **Create Incident**: Trigger new simulation or real incident triage.

### 🔍 Incident Details (`/incidents/:id`)
- **AI Diagnostics Card**: Root cause synthesis, confidence score, blast radius impact, and recommended action.
- **Incident Timeline**: Chronological audit trail showing actor badges (`system`, `ai`, `user`, `n8n`, `fastapi`).
- **Action Buttons**: `Trigger AI Analysis`, `Approve Remediation`, `Resolve`, and `Close Incident`.

### 🛡️ Approvals (`/approvals`)
- **Tabs**: `Pending Approvals` (with unread count badge), `Approved History`, `Rejected`.
- **Approval Flow**: One-click modal confirmation with full justification context.
- **Reject Flow**: Operator override with optional rejection reason.

### ⚡ Actions (`/actions`)
- **Live Audit Trail**: Chronological record of all infrastructure actions executed by workers.
- **Statuses**: `PENDING`, `RUNNING`, `SUCCESS`, `FAILED`, `REJECTED`.

### 🔄 Automation (`/automation`)
- **8-Step Pipeline Diagram**: Interactive visualization of the end-to-end event flow.
- **n8n Status Widget**: Webhook health, total executions (124+), and success rate.
- **Automation Execution Logs**: Telemetry and step duration records.

### 📈 Reports & Analytics (`/reports`)
- **MTTR Trends**: Compare manual triage time vs Lily autonomous resolution.
- **Service Distribution**: Bar charts showing incident frequency by microservice.
- **Severity Breakdown**: Donut chart with color-coded severity slices.

### ⚙️ Settings (`/settings`)
- **Integrations**: Live connection statuses for AI Engine, n8n, Telegram, and PostgreSQL.
- **Automation Policies**: Safety thresholds for auto-remediation vs mandatory approval.
- **Notifications**: Configure Telegram channel handles and SLA escalation timeouts.

---

## 🛠️ 5. Dual-Mode Configuration

Lily supports both **Mock Simulation Mode** (for standalone testing, demos, and presentations) and **Live FastAPI Backend Mode**:

To toggle modes, edit `.env` in `lily-web`:

```env
# Mode 1: Local Mock Mode (No backend required)
VITE_USE_MOCK_DATA=true

# Mode 2: Live Backend Mode (FastAPI + PostgreSQL + n8n)
VITE_USE_MOCK_DATA=false
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

---

## ⌨️ 6. Quick Keyboard Shortcuts & Pro-Tips

- `Ctrl + K` or `Cmd + K`: Focus the global search bar in the topbar.
- Click on any incident row in the Dashboard or Incidents table to open the full investigation details.
- Active incidents poll automatically every 2-5 seconds — no manual browser refreshes needed!
