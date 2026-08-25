# Lily Web — AI Incident Response & Automation Platform

![Lily Badge](https://img.shields.io/badge/Platform-Lily_AI-2563EB?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production_Ready-10B981?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React_19_|_TypeScript_|_Tailwind_|_Vite-blue?style=for-the-badge)

**Lily** is an autonomous AI incident triage and response platform that detects anomalies, synthesizes root causes, proposes automated remediation workflows, gathers human approval, and coordinates execution via **n8n** and **FastAPI** with instant **Telegram** notifications.

---

## 🏗️ Architecture

```
React Frontend (lily-web)
      │
      │ REST API (Axios + TanStack Query)
      ▼
FastAPI Backend (lily-backend)
      │
      ├── PostgreSQL (State & Audit Records)
      ├── AI Engine (LLM Root Cause Reasoning)
      └── n8n Automation Engine
            │
            ├── Telegram Gateway (On-Call Alerts)
            ├── Approval Escalations
            └── Automated Actions (Worker Execution)
```

> **Security Guarantee:** The frontend communicates exclusively with the FastAPI backend REST API. AI keys, n8n secrets, database credentials, and bot tokens are never exposed to the client.

---

## ⚡ Technology Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS (Dark Navy & Electric Blue enterprise SaaS design system)
- **Data Fetching & Server State**: TanStack Query (with smart polling & automatic cache invalidation)
- **HTTP Client**: Axios with centralized error handling and fallback mock engine
- **Form Handling & Validation**: React Hook Form + Zod
- **Icons**: Lucide React
- **Data Visualization**: Recharts

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

`.env` variables:

```env
# Backend API Base URL
VITE_API_BASE_URL=http://localhost:8000/api/v1

# Enable realistic in-memory mock engine for local demo / testing without backend
VITE_USE_MOCK_DATA=true
```

### 3. Start Development Server

```bash
pnpm dev
# or
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Production Build & Preview

```bash
pnpm build
pnpm preview
```

---

## 🎯 12-Step Hackathon Demo Flow

Lily is engineered to demonstrate an end-to-end autonomous incident response lifecycle:

1. **Dashboard Overview**: View live telemetry, 12 active incidents, 2 critical items, 48 resolved today, and an 18-minute average MTTR.
2. **Declare Incident**: Click `+ Create Incident` (e.g. *"Payment API latency increased (>3500ms)"* on `payment-api` in `production`).
3. **Autonomous Triage**: Incident starts in `ANALYZING` state with active pulse indicators.
4. **AI Diagnostics Completed**: Lily AI diagnoses stale connection pool exhaustion with **92% confidence**, classifies severity as `HIGH`, and formulates the remediation action: *"Restart payment-api and flush connection pool"*.
5. **Human Governance**: Status transitions to `AWAITING_APPROVAL`.
6. **Approvals Hub**: Navigate to the **Approvals** page and review the proposed action and blast radius.
7. **One-Click Approval**: Click `Approve Action` with optional audit note.
8. **n8n Orchestration Dispatched**: n8n triggers the automated workflow.
9. **Infrastructure Action Executed**: FastAPI worker executes the restart and pool cycling.
10. **Telegram Sync**: Instant alert notification delivered to `#incidents-prod`.
11. **Incident Resolved**: Lily confirms telemetry normalization and transitions status to `RESOLVED ✓`.
12. **Analytics Updated**: Dashboard metrics, MTTR reduction charts, and audit logs update in real-time.

---

## 📁 Project Structure

```
src/
├── api/                  # Typed API clients & mock state engine
│   ├── client.ts
│   ├── mockData.ts
│   ├── incidents.ts
│   ├── dashboard.ts
│   ├── approvals.ts
│   ├── actions.ts
│   ├── automation.ts
│   └── system.ts
├── components/
│   ├── layout/           # AppLayout, Sidebar, Topbar, MobileSidebar
│   ├── dashboard/        # MetricCard, IncidentChart, RecentIncidents, SystemStatus, AIOverview
│   ├── incidents/        # Table, Cards, Filters, Badges, Timeline, AIAnalysisCard, Dialog
│   ├── approvals/        # ApprovalCard, ApprovalList, ApprovalDialog, RejectDialog
│   ├── actions/          # ActionCard, ActionHistory, ActionStatusBadge
│   ├── automation/       # WorkflowDiagram, AutomationCard, AutomationLog
│   ├── common/           # PageHeader, EmptyState, LoadingState, ErrorState, ConfirmDialog
│   └── ui/               # Button, Card, Badge, Modal, Input, Select, Skeleton, Tabs, Toast
├── context/              # ToastContext
├── hooks/                # TanStack Query custom hooks
├── pages/                # Dashboard, Incidents, IncidentDetails, Approvals, Actions, Automation, Reports, Settings, NotFound
├── types/                # Strict TypeScript domain interfaces
├── utils/                # Date formatting, duration, severity & status styles, cn helper
├── constants/            # Services list, environments, polling intervals
├── App.tsx
├── main.tsx
└── index.css             # Tailwind design tokens and keyframe micro-animations
```
