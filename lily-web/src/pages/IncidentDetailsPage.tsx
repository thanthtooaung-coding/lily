import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  XCircle,
  Server,
  Globe,
  Radio,
  Zap,
} from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { IncidentSeverityBadge } from '../components/incidents/IncidentSeverityBadge'
import { IncidentStatusBadge } from '../components/incidents/IncidentStatusBadge'
import { AIAnalysisCard } from '../components/incidents/AIAnalysisCard'
import { IncidentTimeline } from '../components/incidents/IncidentTimeline'
import { ApprovalDialog } from '../components/approvals/ApprovalDialog'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { LoadingState } from '../components/common/LoadingState'
import { ErrorState } from '../components/common/ErrorState'
import {
  useIncident,
  useAnalyzeIncident,
  useResolveIncident,
  useCloseIncident,
} from '../hooks/useIncidents'
import { formatDateTime } from '../utils/formatDate'

export const IncidentDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isApproveOpen, setIsApproveOpen] = useState(false)

  const { data: incident, isLoading, isError, refetch } = useIncident(id || '')
  const analyzeMutation = useAnalyzeIncident()
  const resolveMutation = useResolveIncident()
  const closeMutation = useCloseIncident()

  if (isLoading) {
    return <LoadingState message="Loading incident investigation file..." />
  }

  if (isError || !incident) {
    return (
      <ErrorState
        title="Incident not found"
        message={`Unable to load details for incident ID: ${id}`}
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Back button & Title */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <button
          type="button"
          onClick={() => navigate('/incidents')}
          className="hover:text-slate-100 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Incidents</span>
        </button>
        <span>/</span>
        <span className="font-mono text-slate-300">{incident.id}</span>
      </div>

      <PageHeader
        title={incident.title}
        subtitle={`Reported in ${incident.environment} on service ${incident.service}`}
        badge={
          <div className="flex items-center gap-2">
            <IncidentSeverityBadge severity={incident.severity} />
            <IncidentStatusBadge status={incident.status} />
          </div>
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {incident.status === 'OPEN' && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => analyzeMutation.mutate(incident.id)}
                isLoading={analyzeMutation.isPending}
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                Trigger AI Analysis
              </Button>
            )}

            {incident.status === 'AWAITING_APPROVAL' && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsApproveOpen(true)}
                leftIcon={<Zap className="w-4 h-4" />}
              >
                Approve Remediation
              </Button>
            )}

            {incident.status !== 'RESOLVED' && incident.status !== 'CLOSED' && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => resolveMutation.mutate(incident.id)}
                isLoading={resolveMutation.isPending}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Resolve
              </Button>
            )}

            {incident.status === 'RESOLVED' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => closeMutation.mutate(incident.id)}
                isLoading={closeMutation.isPending}
                leftIcon={<XCircle className="w-4 h-4" />}
              >
                Close Incident
              </Button>
            )}
          </div>
        }
      />

      {/* Main Grid: Left Diagnostic Cards, Right Metadata & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: AI Diagnostics & Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Analysis Card */}
          <AIAnalysisCard
            incident={incident}
            onApproveClick={() => setIsApproveOpen(true)}
          />

          {/* Description & Observed Symptoms */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">Incident Description & Context</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-1 text-sm text-slate-200">
              <p className="leading-relaxed bg-[#0B1220] p-4 rounded-xl border border-[#24324A] font-sans">
                {incident.description}
              </p>

              {/* Source & Monitoring details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-[#0B1220]/60 border border-[#24324A]/60 flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block">Ingestion Source</span>
                    <span className="font-semibold text-slate-200">
                      {incident.source || 'Datadog APM / API Alert Ingestion'}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#0B1220]/60 border border-[#24324A]/60 flex items-center gap-2.5">
                  <Radio className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block">Telemetry Monitor</span>
                    <span className="font-semibold text-slate-200">
                      Active (p99 latency trigger)
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Key Details Card & Incident Timeline */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                Incident Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-1 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#0B1220] border border-[#24324A]">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-blue-400" />
                  Service
                </span>
                <span className="font-mono font-semibold text-slate-200">
                  {incident.service}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-[#0B1220] border border-[#24324A]">
                <span className="text-slate-400">Environment</span>
                <span className="font-semibold text-slate-200 capitalize">
                  {incident.environment}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-[#0B1220] border border-[#24324A]">
                <span className="text-slate-400">Created At</span>
                <span className="font-mono text-slate-300">
                  {formatDateTime(incident.createdAt || incident.created_at)}
                </span>
              </div>

              {incident.resolvedAt && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#0B1220] border border-emerald-500/30">
                  <span className="text-emerald-400">Resolved At</span>
                  <span className="font-mono text-emerald-300">
                    {formatDateTime(incident.resolvedAt)}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timeline */}
          <IncidentTimeline incident={incident} />
        </div>
      </div>

      {/* Approval Dialog */}
      <ApprovalDialog
        approval={{
          id: `appr-${incident.id}`,
          incidentId: incident.id,
          incidentTitle: incident.title,
          action: incident.recommendedAction || `Restart ${incident.service}`,
          reason: incident.aiSummary || 'Automated remediation recommended by Lily AI.',
          riskLevel: incident.severity === 'CRITICAL' ? 'HIGH' : 'MEDIUM',
          status: 'PENDING',
          requestedAt: incident.updatedAt || new Date().toISOString(),
        }}
        isOpen={isApproveOpen}
        onClose={() => setIsApproveOpen(false)}
      />
    </div>
  )
}
