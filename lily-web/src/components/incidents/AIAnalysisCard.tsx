import React from 'react'
import {
  Sparkles,
  Zap,
  Target,
  AlertTriangle,
  ArrowRight,
  Loader2,
  ShieldCheck,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { IncidentSeverityBadge } from './IncidentSeverityBadge'
import { useAnalyzeIncident } from '../../hooks/useIncidents'
import type { Incident } from '../../types/incident'

interface AIAnalysisCardProps {
  incident: Incident
  onApproveClick?: () => void
}

export const AIAnalysisCard: React.FC<AIAnalysisCardProps> = ({
  incident,
  onApproveClick,
}) => {
  const analyzeMutation = useAnalyzeIncident()
  const isAnalyzing = incident.status === 'ANALYZING' || analyzeMutation.isPending
  const analysis = incident.aiAnalysis

  const confidenceScore =
    incident.aiConfidence !== undefined
      ? incident.aiConfidence <= 1
        ? Math.round(incident.aiConfidence * 100)
        : Math.round(incident.aiConfidence)
      : analysis?.confidence
      ? Math.round(analysis.confidence * 100)
      : 92

  return (
    <Card className="relative overflow-hidden border-blue-500/40 bg-gradient-to-b from-[#151F32] via-[#101C31] to-[#0F172A] shadow-xl shadow-blue-950/20">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-blue-500/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shadow-inner">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-base sm:text-lg font-bold text-slate-100">
              Lily AI Diagnostics & Recommendation
            </CardTitle>
            <p className="text-xs text-blue-300/80">
              Autonomous root cause triangulation and remediation synthesis
            </p>
          </div>
        </div>

        {isAnalyzing ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/20 text-blue-300 border border-blue-400/40 animate-pulse">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Analyzing...
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Diagnostic Confidence:</span>
            <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-blue-500/20 text-blue-300 border border-blue-400/40 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-blue-400" />
              {confidenceScore}%
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-5 pt-4">
        {isAnalyzing ? (
          <div className="py-8 text-center space-y-3">
            <div className="relative inline-flex">
              <div className="w-12 h-12 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
              <Sparkles className="w-6 h-6 text-blue-400 absolute inset-0 m-auto animate-pulse" />
            </div>
            <p className="text-sm font-semibold text-slate-200">
              Lily AI is synthesizing logs, APM traces, and telemetry...
            </p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Correlating p99 anomalies with recent git deployments and connection pools.
            </p>
          </div>
        ) : (
          <>
            {/* Metadata Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-2.5 rounded-lg bg-[#0B1220]/80 border border-[#24324A]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                  Severity
                </span>
                <IncidentSeverityBadge severity={analysis?.severity || incident.severity} />
              </div>

              <div className="p-2.5 rounded-lg bg-[#0B1220]/80 border border-[#24324A]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                  Category
                </span>
                <span className="text-xs font-semibold text-slate-200">
                  {analysis?.category || incident.category || 'PERFORMANCE'}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0B1220]/80 border border-[#24324A]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                  Urgency
                </span>
                <span className="text-xs font-semibold text-orange-400">
                  {analysis?.urgency || incident.urgency || 'HIGH'}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0B1220]/80 border border-[#24324A]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                  Human Approval
                </span>
                <span className="text-xs font-semibold text-amber-400">
                  {analysis?.requiresApproval || incident.requiresApproval !== false
                    ? 'Required'
                    : 'Auto-Remediate'}
                </span>
              </div>
            </div>

            {/* AI Summary */}
            <div className="p-3.5 rounded-xl bg-[#0B1220]/70 border border-[#24324A] space-y-1">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Root Cause Synthesis
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {incident.aiSummary ||
                  analysis?.summary ||
                  `${incident.title}: Lily AI identified anomalous resource lock contention on ${incident.service}.`}
              </p>
            </div>

            {/* Impact Assessment */}
            <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/20 space-y-1">
              <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Blast Radius & Impact
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {incident.impact ||
                  analysis?.impact ||
                  'Users in production may experience degradation and transaction timeout errors.'}
              </p>
            </div>

            {/* Recommended Action Card */}
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-blue-400" />
                  Recommended Autonomous Action
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-600/30 text-blue-200 border border-blue-500/30 font-semibold">
                  n8n Workflow
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-100 font-mono bg-[#0B1220] p-2.5 rounded-lg border border-[#24324A]">
                {incident.recommendedAction ||
                  analysis?.recommendedAction ||
                  `Restart ${incident.service} and cycle connection pool.`}
              </p>

              {incident.status === 'AWAITING_APPROVAL' && onApproveClick && (
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-amber-300 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    Awaiting operator sign-off
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={onApproveClick}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Review & Approve Action
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
