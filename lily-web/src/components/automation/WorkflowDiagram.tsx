import React, { useState } from 'react'
import {
  AlertTriangle,
  Sparkles,
  Target,
  ShieldCheck,
  Workflow,
  Zap,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { Card } from '../ui/Card'
import { cn } from '../../utils/cn'

interface WorkflowStepItem {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  status: 'COMPLETED' | 'ACTIVE' | 'PENDING'
  technology: string
  description: string
}

const WORKFLOW_STEPS: WorkflowStepItem[] = [
  {
    id: 'step-1',
    title: '1. Incident Ingestion',
    subtitle: 'APM & Telemetry Trigger',
    icon: <AlertTriangle className="w-5 h-5 text-red-400" />,
    status: 'COMPLETED',
    technology: 'Datadog / Prometheus / API',
    description:
      'Anomaly detection alarms fire when p99 latency breaches 3.5s or error rate exceeds threshold.',
  },
  {
    id: 'step-2',
    title: '2. Lily AI Triage',
    subtitle: 'Root Cause Synthesis',
    icon: <Sparkles className="w-5 h-5 text-blue-400" />,
    status: 'COMPLETED',
    technology: 'FastAPI + LLM AI Engine',
    description:
      'Correlates traces, logs, git commits, and memory usage to formulate diagnosis with confidence scoring.',
  },
  {
    id: 'step-3',
    title: '3. Severity & Blast Radius',
    subtitle: 'Impact Classification',
    icon: <Target className="w-5 h-5 text-orange-400" />,
    status: 'COMPLETED',
    technology: 'AI Classification Model',
    description:
      'Determines CRITICAL/HIGH status and checks policy if human operator sign-off is mandated.',
  },
  {
    id: 'step-4',
    title: '4. Human Approval',
    subtitle: 'Operator Governance',
    icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
    status: 'COMPLETED',
    technology: 'Lily Web Dashboard',
    description:
      'Operator reviews AI remediation proposal, assesses risks, and grants one-click authorization.',
  },
  {
    id: 'step-5',
    title: '5. n8n Orchestration',
    subtitle: 'Workflow Automation',
    icon: <Workflow className="w-5 h-5 text-indigo-400" />,
    status: 'ACTIVE',
    technology: 'n8n Engine Webhook',
    description:
      'Dispatches multi-step async automation pipelines, coordinates retries, and synchronizes callbacks.',
  },
  {
    id: 'step-6',
    title: '6. FastAPI Action Execution',
    subtitle: 'Infrastructure Remediation',
    icon: <Zap className="w-5 h-5 text-blue-400" />,
    status: 'PENDING',
    technology: 'FastAPI Simulated Workers',
    description:
      'Executes container restart, DB connection cleanup, cache eviction, or pod auto-scaling.',
  },
  {
    id: 'step-7',
    title: '7. Telegram Alert & Sync',
    subtitle: 'On-Call Communication',
    icon: <Send className="w-5 h-5 text-sky-400" />,
    status: 'PENDING',
    technology: 'Telegram Bot Gateway',
    description:
      'Sends rich Markdown notifications and incident status cards directly to engineering Telegram channels.',
  },
  {
    id: 'step-8',
    title: '8. Incident Resolved',
    subtitle: 'Autonomous Verification',
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    status: 'PENDING',
    technology: 'Lily Health Verifier',
    description:
      'Validates latency normalization, updates incident state to RESOLVED, and registers audit record.',
  },
]

export const WorkflowDiagram: React.FC = () => {
  const [expandedStep, setExpandedStep] = useState<string | null>('step-5')

  return (
    <div className="space-y-6">
      {/* Workflow Diagram Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-[#151F32] to-[#0B1220] border border-blue-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              End-to-End Orchestration
            </span>
            <h3 className="text-xl font-bold text-slate-100">
              Lily Autonomous Remediation Architecture
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Every production incident follows this deterministic, AI-guided and human-supervised
              automation pipeline.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3 py-1.5 rounded-xl bg-[#0B1220] border border-[#24324A] text-xs">
              <span className="text-slate-400">n8n Status: </span>
              <strong className="text-emerald-400">Connected ✓</strong>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#0B1220] border border-[#24324A] text-xs">
              <span className="text-slate-400">Avg Flow Time: </span>
              <strong className="text-blue-400 font-mono">4.2s</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Node Grid with Connectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {WORKFLOW_STEPS.map((step) => {
          const isExpanded = expandedStep === step.id
          const isActive = step.status === 'ACTIVE'
          const isCompleted = step.status === 'COMPLETED'

          return (
            <Card
              key={step.id}
              onClick={() => setExpandedStep(isExpanded ? null : step.id)}
              className={cn(
                'p-4 sm:p-5 transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between',
                isActive
                  ? 'border-blue-500 bg-[#121E36] ring-2 ring-blue-500/30 shadow-xl shadow-blue-900/20 -translate-y-1'
                  : isCompleted
                  ? 'border-emerald-500/30 bg-[#151F32]'
                  : 'border-[#24324A] bg-[#151F32]/80 opacity-80 hover:opacity-100'
              )}
            >
              {/* Top Row: Icon + Tech badge */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div
                    className={cn(
                      'p-2.5 rounded-xl border',
                      isActive
                        ? 'bg-blue-600/20 border-blue-500/40 text-blue-400 animate-pulse'
                        : isCompleted
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    )}
                  >
                    {step.icon}
                  </div>

                  <span
                    className={cn(
                      'px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase border',
                      isActive
                        ? 'bg-blue-500/20 text-blue-300 border-blue-400/40 animate-pulse'
                        : isCompleted
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    )}
                  >
                    {step.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-100">{step.title}</h4>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{step.subtitle}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#24324A]/60 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono">{step.technology}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>

                {isExpanded && (
                  <p className="text-xs text-slate-300 pt-2 border-t border-[#24324A]/40 leading-relaxed animate-in fade-in">
                    {step.description}
                  </p>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
