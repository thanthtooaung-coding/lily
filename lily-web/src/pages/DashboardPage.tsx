import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AlertTriangle,
  Flame,
  CheckCircle2,
  Clock,
  Plus,
  Radio,
  Sparkles,
} from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { MetricCard } from '../components/dashboard/MetricCard'
import { IncidentChart } from '../components/dashboard/IncidentChart'
import { RecentIncidents } from '../components/dashboard/RecentIncidents'
import { SystemStatus } from '../components/dashboard/SystemStatus'
import { AIOverview } from '../components/dashboard/AIOverview'
import { CreateIncidentDialog } from '../components/incidents/CreateIncidentDialog'
import { Button } from '../components/ui/Button'
import { LoadingState } from '../components/common/LoadingState'
import { ErrorState } from '../components/common/ErrorState'
import { useDashboard } from '../hooks/useDashboard'

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate()
  const { data: dashboard, isLoading, isError, refetch } = useDashboard()
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  if (isLoading) {
    return <LoadingState message="Loading platform metrics & telemetry..." />
  }

  if (isError || !dashboard) {
    return (
      <ErrorState
        title="Failed to load dashboard metrics"
        onRetry={() => refetch()}
      />
    )
  }

  const { metrics, activity, recentIncidents, aiOverview } = dashboard

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Welcome Header */}
      <PageHeader
        title="Good evening 👋"
        subtitle="Lily is actively monitoring your microservices and auto-triaging incidents."
        badge={
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/10 text-blue-400 border border-blue-500/20">
            <Radio className="w-3.5 h-3.5 animate-pulse text-blue-400" />
            Live Telemetry Engine
          </span>
        }
        actions={
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/automation')}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              View Automation
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsCreateOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Create Incident
            </Button>
          </div>
        }
      />

      {/* KPI Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Open Incidents"
          value={metrics.openIncidents}
          trend={metrics.openIncidentsTrend}
          trendType="neutral"
          icon={<AlertTriangle className="w-4 h-4 text-blue-400" />}
          onClick={() => navigate('/incidents')}
        />

        <MetricCard
          title="Critical Incidents"
          value={metrics.criticalIncidents}
          trend={metrics.criticalIncidentsStatus}
          trendType={metrics.criticalIncidents > 0 ? 'critical' : 'positive'}
          icon={<Flame className="w-4 h-4 text-red-400" />}
          onClick={() => navigate('/incidents?severity=CRITICAL')}
        />

        <MetricCard
          title="Resolved Today"
          value={metrics.resolvedToday}
          trend={metrics.resolvedTrend}
          trendType="positive"
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          onClick={() => navigate('/incidents?status=RESOLVED')}
        />

        <MetricCard
          title="Avg Resolution Time"
          value={metrics.avgResolutionTime}
          trend={metrics.avgResolutionTrend}
          trendType="positive"
          icon={<Clock className="w-4 h-4 text-blue-400" />}
          subtitle="AI triage & automation savings"
        />
      </div>

      {/* Charts & AI Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <IncidentChart data={activity} />
        </div>
        <div>
          <AIOverview data={aiOverview} />
        </div>
      </div>

      {/* Recent Incidents & System Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentIncidents incidents={recentIncidents} />
        </div>
        <div>
          <SystemStatus />
        </div>
      </div>

      <CreateIncidentDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  )
}
