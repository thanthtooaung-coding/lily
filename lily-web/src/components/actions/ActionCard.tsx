import React from 'react'
import { Zap, CheckCircle2, AlertCircle, Clock, Loader2 } from 'lucide-react'
import { Card } from '../ui/Card'
import { ActionStatusBadge } from './ActionStatusBadge'
import { formatRelativeTime } from '../../utils/formatDate'
import type { IncidentAction } from '../../types/action'

interface ActionCardProps {
  action: IncidentAction
}

export const ActionCard: React.FC<ActionCardProps> = ({ action }) => {
  const isRunning = action.status === 'RUNNING'

  return (
    <Card
      className={`p-5 space-y-3 transition-all ${
        isRunning ? 'border-blue-500/50 bg-[#121E36] ring-1 ring-blue-500/20' : 'bg-[#151F32]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-xl border ${
              action.status === 'SUCCESS'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : action.status === 'FAILED'
                ? 'bg-red-500/10 border-red-500/20 text-red-400'
                : isRunning
                ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {isRunning ? (
              <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
            ) : action.status === 'SUCCESS' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : action.status === 'FAILED' ? (
              <AlertCircle className="w-4 h-4 text-red-400" />
            ) : (
              <Zap className="w-4 h-4" />
            )}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100 font-mono">
              {action.description}
            </h4>
            <p className="text-xs text-slate-400">
              {action.incidentTitle || `Incident ID: ${action.incidentId}`}
            </p>
          </div>
        </div>

        <ActionStatusBadge status={action.status} />
      </div>

      {action.result && (
        <div className="p-3 rounded-lg bg-[#0B1220] border border-[#24324A] text-xs text-slate-300">
          <span className="font-semibold text-emerald-400">Execution Result: </span>
          {action.result}
        </div>
      )}

      {action.errorMessage && (
        <div className="p-3 rounded-lg bg-red-950/30 border border-red-500/30 text-xs text-red-300">
          <span className="font-semibold text-red-400">Error: </span>
          {action.errorMessage}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#24324A]/60 text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <span>Triggered by: </span>
          <strong className="text-slate-300">
            {action.triggeredBy || action.requestedBy || 'Autonomous Orchestrator'}
          </strong>
        </span>
        <span className="flex items-center gap-1 font-mono">
          <Clock className="w-3 h-3 text-slate-500" />
          {formatRelativeTime(action.completedAt || action.startedAt || action.createdAt)}
        </span>
      </div>
    </Card>
  )
}
