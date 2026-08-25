import React from 'react'
import { ActionStatusBadge } from './ActionStatusBadge'
import { EmptyState } from '../common/EmptyState'
import { Zap } from 'lucide-react'
import { formatRelativeTime, formatDateTime } from '../../utils/formatDate'
import type { IncidentAction } from '../../types/action'

interface ActionHistoryProps {
  actions: IncidentAction[]
}

export const ActionHistory: React.FC<ActionHistoryProps> = ({ actions }) => {
  if (actions.length === 0) {
    return (
      <EmptyState
        icon={<Zap className="w-6 h-6 text-blue-400" />}
        title="No remediation actions recorded"
        description="Automated and human-approved remediation executions will be tracked here."
      />
    )
  }

  return (
    <div className="bg-[#151F32] border border-[#24324A] rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#24324A] bg-[#0F172A]/50 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-4">Action</th>
              <th className="py-3.5 px-4">Target Incident</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Triggered By</th>
              <th className="py-3.5 px-4">Started / Created</th>
              <th className="py-3.5 px-4">Completed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#24324A]/60">
            {actions.map((act) => (
              <tr key={act.id} className="hover:bg-[#1E293B]/60 transition-colors">
                <td className="py-3.5 px-4 font-mono font-medium text-slate-100 max-w-xs">
                  {act.description}
                </td>
                <td className="py-3.5 px-4 text-slate-300 font-medium max-w-xs truncate">
                  {act.incidentTitle || act.incidentId}
                </td>
                <td className="py-3.5 px-4">
                  <ActionStatusBadge status={act.status} />
                </td>
                <td className="py-3.5 px-4 text-slate-300">
                  {act.triggeredBy || act.requestedBy || 'Autonomous Engine'}
                </td>
                <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                  {formatRelativeTime(act.startedAt || act.createdAt)}
                </td>
                <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                  {act.completedAt ? (
                    <span className="text-emerald-400">{formatDateTime(act.completedAt)}</span>
                  ) : act.status === 'RUNNING' ? (
                    <span className="text-blue-400 animate-pulse">Running in progress...</span>
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
