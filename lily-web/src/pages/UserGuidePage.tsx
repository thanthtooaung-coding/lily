import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Sparkles,
  Zap,
  ShieldCheck,
  Workflow,
  ArrowRight,
  Send,
  Cpu,
  Layers,
  HelpCircle,
  Clock,
  Terminal,
  Activity,
  Lightbulb,
  CheckCircle2,
  HeartPulse,
  Smile,
  AlertTriangle,
  Bot,
  UserCheck,
} from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Tabs } from '../components/ui/Tabs'

export const UserGuidePage: React.FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<string>('simple-guide')

  const guideTabs = [
    { key: 'simple-guide', label: '🌱 Simple Guide (Non-Tech)', icon: <Smile className="w-3.5 h-3.5 text-emerald-400" /> },
    { key: 'demo-flow', label: '12-Step Demo Guide', icon: <Zap className="w-3.5 h-3.5 text-amber-400" /> },
    { key: 'architecture', label: 'How Lily Works', icon: <Workflow className="w-3.5 h-3.5 text-indigo-400" /> },
    { key: 'features', label: 'Page Directory', icon: <Layers className="w-3.5 h-3.5 text-blue-400" /> },
    { key: 'playbook', label: 'Operator Playbook', icon: <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> },
    { key: 'faq', label: 'FAQ & Settings', icon: <HelpCircle className="w-3.5 h-3.5 text-slate-400" /> },
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-7xl mx-auto pb-12">
      <PageHeader
        title="Lily User Manual & Interactive Guide"
        subtitle="Understand how Lily keeps cloud services online using AI triage and automated workflows — explained for both technical and non-technical users."
        badge={
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/10 text-blue-400 border border-blue-500/30">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            Official Platform Handbook
          </span>
        }
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/dashboard')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Go to Live Dashboard
          </Button>
        }
      />

      {/* Guide Navigation Tabs */}
      <Tabs tabs={guideTabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* TAB 0: Simple Guide (For Non-Technical Users) */}
      {activeTab === 'simple-guide' && (
        <div className="space-y-6">
          {/* Welcome Banner in Plain English */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-[#151F32] to-[#0B1220] border border-emerald-500/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Smile className="w-3.5 h-3.5" />
                Plain English Guide
              </span>
              <span className="text-xs text-slate-400">Zero technical jargon required</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
              What is Lily and What Does It Do?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-2 leading-relaxed">
              Think of Lily as a <strong>smart digital paramedic and automated assistant</strong> for websites and apps (like payment gateways, logins, and databases). When an app gets slow or breaks down, Lily finds out why, asks a human for permission to fix it, and cures the problem in seconds.
            </p>
          </div>

          {/* Real-World Analogy */}
          <Card className="p-6 space-y-4 border-blue-500/30">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-red-400" />
              The Hospital Analogy: How Lily Works in Everyday Life
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-2">
                <span className="text-red-400 font-bold block text-sm">1. Problem Happens</span>
                <p className="text-slate-400 leading-relaxed">
                  A patient feels sick (a website becomes slow). The hospital monitors sound an alarm.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-2">
                <span className="text-blue-400 font-bold block text-sm">2. Lily Diagnoses</span>
                <p className="text-slate-400 leading-relaxed">
                  Doctor Lily reviews the patient tests with 92% certainty: <em>"They need a quick restart & fresh connection."</em>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-2">
                <span className="text-amber-400 font-bold block text-sm">3. Human Permission</span>
                <p className="text-slate-400 leading-relaxed">
                  Lily asks the head nurse (you!): <em>"Should I give this medicine?"</em> You tap <strong>Approve</strong>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-2">
                <span className="text-emerald-400 font-bold block text-sm">4. Problem Solved</span>
                <p className="text-slate-400 leading-relaxed">
                  Automated medicine robot delivers the fix. The patient is cured, and the team gets a text on Telegram!
                </p>
              </div>
            </div>
          </Card>

          {/* Simple Jargon Buster / Glossary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Bot className="w-4 h-4 text-blue-400" />
                Simple Word Guide (Jargon Buster)
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="p-2.5 rounded-lg bg-[#0B1220] border border-[#24324A]">
                  <strong className="text-blue-300">Incident: </strong>
                  A glitch, slowdown, or crash in one of our online systems (e.g. checkout taking too long).
                </li>
                <li className="p-2.5 rounded-lg bg-[#0B1220] border border-[#24324A]">
                  <strong className="text-blue-300">AI Confidence (e.g. 92%): </strong>
                  How sure Lily is about what caused the glitch and how to solve it.
                </li>
                <li className="p-2.5 rounded-lg bg-[#0B1220] border border-[#24324A]">
                  <strong className="text-blue-300">Remediation: </strong>
                  The "cure" or action needed to fix the problem (like restarting the server or cleaning memory).
                </li>
                <li className="p-2.5 rounded-lg bg-[#0B1220] border border-[#24324A]">
                  <strong className="text-blue-300">Approval: </strong>
                  A safety check where Lily stops and asks a human to confirm before making big changes.
                </li>
                <li className="p-2.5 rounded-lg bg-[#0B1220] border border-[#24324A]">
                  <strong className="text-blue-300">MTTR (Resolution Time): </strong>
                  How many minutes it takes to fix a broken service. Lily brings this down from hours to minutes!
                </li>
              </ul>
            </Card>

            {/* Colors Guide & What to Do */}
            <Card className="p-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                Traffic Light Colors: What They Mean
              </h3>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                  <div>
                    <strong className="text-red-400">RED (Critical): </strong>
                    <span className="text-slate-300">Urgent problem. Something is broken for customers right now.</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-orange-500 shrink-0" />
                  <div>
                    <strong className="text-orange-400">ORANGE (High): </strong>
                    <span className="text-slate-300">System is slow or having errors. Needs fast attention.</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                  <div>
                    <strong className="text-amber-300">YELLOW (Awaiting Approval): </strong>
                    <span className="text-slate-300">Lily has the fix ready! It is waiting for you to click "Approve".</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0" />
                  <div>
                    <strong className="text-blue-400">BLUE (Analyzing / Running): </strong>
                    <span className="text-slate-300">Lily is actively investigating or carrying out the fix.</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                  <div>
                    <strong className="text-emerald-400">GREEN (Resolved): </strong>
                    <span className="text-slate-300">All fixed! Everything is working normally again.</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Simple 3-Step Action Guide for Anyone */}
          <Card className="p-6 space-y-4 bg-gradient-to-br from-[#151F32] to-[#101C31]">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              How You Can Use This App in 3 Simple Steps
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-2">
                <span className="font-bold text-blue-400 block text-sm">Step 1: Check the Dashboard</span>
                <p className="text-slate-400 leading-relaxed">
                  Open the Dashboard. Look at the top numbers. If you see open incidents, you can click on them to see what's happening.
                </p>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => navigate('/dashboard')}
                  className="w-full"
                >
                  Look at Dashboard
                </Button>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-2">
                <span className="font-bold text-amber-400 block text-sm">Step 2: Approve Pending Fixes</span>
                <p className="text-slate-400 leading-relaxed">
                  Click on "Approvals" in the left menu. If there is a pending request, read the simple summary and click <strong>Approve</strong>.
                </p>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => navigate('/approvals')}
                  className="w-full"
                >
                  Go to Approvals
                </Button>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-2">
                <span className="font-bold text-emerald-400 block text-sm">Step 3: Watch It Fix Automatically</span>
                <p className="text-slate-400 leading-relaxed">
                  Lily will handle the rest! You don't have to touch any code or server commands. The incident will turn Green and Resolved.
                </p>
                <Button
                  variant="primary"
                  size="xs"
                  onClick={() => navigate('/automation')}
                  className="w-full"
                >
                  Watch Automation Flow
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 1: 12-Step Demo Walkthrough Guide */}
      {activeTab === 'demo-flow' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/70 via-[#151F32] to-[#0B1220] border border-blue-500/30">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                Hackathon Walkthrough
              </span>
              <span className="text-xs text-slate-400 font-mono">Estimated time: 2 minutes</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-100">
              Interactive 12-Step Incident Response Lifecycle
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
              Experience the complete autonomous triage flow from initial p99 latency anomaly detection to AI reasoning, human operator approval, n8n workflow execution, and automated resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                step: '01',
                title: 'Open Dashboard',
                desc: 'Review high-level metrics: 12 open incidents, 2 critical, 48 resolved today, and MTTR trending down 12%.',
                actionLabel: 'Open Dashboard',
                actionPath: '/dashboard',
                icon: <Activity className="w-4 h-4 text-blue-400" />,
              },
              {
                step: '02',
                title: 'Declare an Incident',
                desc: 'Click "+ Create Incident". Enter "Payment API latency increased (>3500ms)", select service payment-api, and choose HIGH severity.',
                actionLabel: 'Go to Incidents',
                actionPath: '/incidents',
                icon: <Zap className="w-4 h-4 text-amber-400" />,
              },
              {
                step: '03',
                title: 'Autonomous Ingestion',
                desc: 'The incident is ingested into FastAPI & Postgres, appearing in the console with status ANALYZING (blue pulsing indicator).',
                actionLabel: 'View Live Feed',
                actionPath: '/incidents',
                icon: <Terminal className="w-4 h-4 text-sky-400" />,
              },
              {
                step: '04',
                title: 'Lily AI Diagnostic Reasoning',
                desc: 'Lily AI correlates telemetry, memory contention, and connection pool saturation, generating a diagnostic summary with 92% confidence.',
                actionLabel: 'View AI Diagnostics',
                actionPath: '/incidents/inc-9481',
                icon: <Sparkles className="w-4 h-4 text-blue-400" />,
              },
              {
                step: '05',
                title: 'Status: Awaiting Approval',
                desc: 'Because the remediation involves restarting a production pod, Lily applies safety governance and requests operator approval.',
                actionLabel: 'Check Approvals',
                actionPath: '/approvals',
                icon: <Clock className="w-4 h-4 text-orange-400" />,
              },
              {
                step: '06',
                title: 'Navigate to Approvals',
                desc: 'Open the Approvals tab. View the pending item: "Restart payment-api and cycle connection pools" with MEDIUM risk rating.',
                actionLabel: 'Approvals Hub',
                actionPath: '/approvals',
                icon: <ShieldCheck className="w-4 h-4 text-amber-400" />,
              },
              {
                step: '07',
                title: 'One-Click Operator Approval',
                desc: 'Click "Approve Action". Confirm in the modal with an optional audit note ("Approved restart to clear connection backlog").',
                actionLabel: 'Review Approvals',
                actionPath: '/approvals',
                icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
              },
              {
                step: '08',
                title: 'n8n Orchestration Trigger',
                desc: 'FastAPI triggers the n8n webhook workflow. The Automation engine coordinates execution tasks and Telegram broadcast in real-time.',
                actionLabel: 'View n8n Pipeline',
                actionPath: '/automation',
                icon: <Workflow className="w-4 h-4 text-indigo-400" />,
              },
              {
                step: '09',
                title: 'Worker Action Execution',
                desc: 'FastAPI executes the restart and pool cycling. Status transitions to RUNNING with a live animated indicator on the Actions page.',
                actionLabel: 'View Actions Log',
                actionPath: '/actions',
                icon: <Zap className="w-4 h-4 text-blue-400" />,
              },
              {
                step: '10',
                title: 'Telegram Alert Delivered',
                desc: 'n8n sends a markdown incident report directly to the on-call channel (#incidents-prod) with action results.',
                actionLabel: 'Check Integration',
                actionPath: '/settings',
                icon: <Send className="w-4 h-4 text-sky-400" />,
              },
              {
                step: '11',
                title: 'Incident Resolved ✓',
                desc: 'Latency normalizes below 120ms. Lily automatically transitions the incident status to RESOLVED and records the full audit trail.',
                actionLabel: 'View Details',
                actionPath: '/incidents/inc-9481',
                icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
              },
              {
                step: '12',
                title: 'Live Metrics Refresh',
                desc: 'Return to Dashboard: Resolved Today counter increments (+1), MTTR graph reflects savings, and all systems report Healthy.',
                actionLabel: 'Back to Dashboard',
                actionPath: '/dashboard',
                icon: <Activity className="w-4 h-4 text-emerald-400" />,
              },
            ].map((item) => (
              <Card key={item.step} className="p-5 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded bg-blue-600/20 text-blue-300 border border-blue-500/30">
                      STEP {item.step}
                    </span>
                    <div className="p-1.5 rounded-lg bg-[#0B1220] border border-[#24324A]">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-slate-100">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => navigate(item.actionPath)}
                  rightIcon={<ArrowRight className="w-3 h-3" />}
                  className="w-full text-xs mt-2"
                >
                  {item.actionLabel}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Architecture & How Lily Works */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-100">
                Core Architectural Principles
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Lily is built on clear separation of concerns, strict security boundary isolation, and human-in-the-loop safety policies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-2">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                  <Cpu className="w-4 h-4" />
                  <span>1. Autonomous AI Triage</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Instead of drowning on-call engineers in thousands of noisy alerts, Lily AI aggregates traces, identifies the exact offending microservice, assigns a statistical confidence score, and formulates remediation steps.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>2. Human-in-the-Loop Gate</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  High-risk actions (like service restarts, node draining, database failovers) are gated behind an approval workflow. Operators review the blast radius and authorize actions with one click.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <Workflow className="w-4 h-4" />
                  <span>3. n8n Event Orchestration</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  n8n handles workflow orchestration, notifications, retry logic, and webhook callbacks. The frontend talks strictly to FastAPI, keeping API tokens and bot secrets completely secure.
                </p>
              </div>
            </div>

            {/* Architecture Diagram Box */}
            <div className="p-5 rounded-xl bg-[#0B1220] border border-blue-500/30 space-y-3 font-mono text-xs text-slate-300 overflow-x-auto">
              <p className="text-blue-400 font-bold font-sans text-sm">System Communication Topology:</p>
              <pre className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
{`React Frontend (lily-web)
      │
      │ REST API (Bearer JWT / Token)
      ▼
FastAPI Backend (lily-backend)
      │
      ├── PostgreSQL (ACID Incident State & Audit Log)
      ├── AI Engine (LLM Reasoning & Root Cause Model)
      └── n8n Automation Engine
            │
            ├── Telegram Alert Gateway (Channel Notifications)
            ├── Approval Escalations (Slack/Telegram)
            └── Automated Actions (Worker Execution & Rollback)`}
              </pre>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 3: Page by Page Guide */}
      {activeTab === 'features' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-base">
              <Activity className="w-5 h-5" />
              <span>Dashboard Page</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your real-time mission control center. Displays live KPIs (Open, Critical, Resolved, MTTR), an interactive Recharts activity timeline with 24H/7D/30D filters, the AI diagnostic overview, recent incidents, and live system health.
            </p>
            <Button
              variant="outline"
              size="xs"
              onClick={() => navigate('/dashboard')}
              rightIcon={<ArrowRight className="w-3 h-3" />}
            >
              Go to Dashboard
            </Button>
          </Card>

          <Card className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
              <AlertTriangle className="w-5 h-5" />
              <span>Incidents & Investigation Hub</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Search, filter by severity or service, and switch between Table and Card views. Click any incident to open the detailed investigation file featuring AI root cause analysis, blast radius, and audit timeline.
            </p>
            <Button
              variant="outline"
              size="xs"
              onClick={() => navigate('/incidents')}
              rightIcon={<ArrowRight className="w-3 h-3" />}
            >
              Go to Incidents
            </Button>
          </Card>

          <Card className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
              <ShieldCheck className="w-5 h-5" />
              <span>Approvals Center</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dedicated governance hub where on-call engineers review pending remediation proposals, inspect justification reasons and risk levels, and either approve or reject with audit comments.
            </p>
            <Button
              variant="outline"
              size="xs"
              onClick={() => navigate('/approvals')}
              rightIcon={<ArrowRight className="w-3 h-3" />}
            >
              Go to Approvals
            </Button>
          </Card>

          <Card className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-base">
              <Workflow className="w-5 h-5" />
              <span>Automation & n8n Telemetry</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Interactive 8-step pipeline diagram demonstrating how incidents move through automated triage, n8n orchestration, FastAPI execution, and Telegram alerting with live execution logs.
            </p>
            <Button
              variant="outline"
              size="xs"
              onClick={() => navigate('/automation')}
              rightIcon={<ArrowRight className="w-3 h-3" />}
            >
              Go to Automation
            </Button>
          </Card>
        </div>
      )}

      {/* TAB 4: Operator Playbook */}
      {activeTab === 'playbook' && (
        <div className="space-y-4">
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              On-Call Operator Best Practices & Safety Playbook
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-1">
                <strong className="text-slate-100 block">1. Diagnosing Incidents with AI Confidence &gt; 90%</strong>
                <p className="text-slate-400 leading-relaxed">
                  When Lily AI returns a confidence score &gt;90%, the root cause has been cross-referenced with multiple telemetry streams. Operators can safely approve recommended actions with high certainty.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-1">
                <strong className="text-slate-100 block">2. Critical Severity Escalations</strong>
                <p className="text-slate-400 leading-relaxed">
                  For CRITICAL incidents, Lily automatically pushes high-priority Telegram alerts to the on-call channel. If an approval is not responded to within the SLA window (configurable in Settings), automated escalation triggers.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-1">
                <strong className="text-slate-100 block">3. Rejecting or Overriding Remediation</strong>
                <p className="text-slate-400 leading-relaxed">
                  If an operator decides not to proceed with an automated action (e.g. during a planned maintenance or marketing surge), click <strong>Reject</strong> and specify the reason. The incident will remain in OPEN status for manual handling.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 5: Dual-Mode & FAQ */}
      {activeTab === 'faq' && (
        <div className="space-y-4">
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-100">
              Frequently Asked Questions & Dual-Mode Configuration
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-4 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-2">
                <strong className="text-blue-400 block text-sm">
                  Q: How do I switch between Mock Mode and Live FastAPI Backend Mode?
                </strong>
                <p className="text-slate-400 leading-relaxed">
                  In <code className="text-slate-200">.env</code> in the <code className="text-slate-200">lily-web</code> root, toggle:
                </p>
                <pre className="bg-[#151F32] p-2.5 rounded-lg border border-[#24324A] text-slate-200 font-mono text-[11px]">
{`# For mock simulation (self-contained, no backend required):
VITE_USE_MOCK_DATA=true

# For live FastAPI + PostgreSQL + n8n backend:
VITE_USE_MOCK_DATA=false
VITE_API_BASE_URL=http://localhost:8000/api/v1`}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-1">
                <strong className="text-slate-100 block">
                  Q: What happens if the backend API goes offline?
                </strong>
                <p className="text-slate-400 leading-relaxed">
                  The API client features automatic fallback detection: if backend requests time out or fail, it smoothly transitions to the local state engine so presentations and tests are never interrupted.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-1">
                <strong className="text-slate-100 block">
                  Q: Does the frontend have live auto-refresh?
                </strong>
                <p className="text-slate-400 leading-relaxed">
                  Yes! Powered by TanStack Query, the platform polls active incidents every 2-5 seconds, updating statuses, timelines, and metric cards automatically without requiring manual page refreshes.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
