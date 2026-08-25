import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Card } from '../ui/Card'
import { IncidentSeverityBadge } from './IncidentSeverityBadge'
import { IncidentStatusBadge } from './IncidentStatusBadge'
import { formatRelativeTime } from '../../utils/formatDate'
import type { Incident } from '../../types/incident'

interface IncidentCardProps {
  incident: Incident
}

export const IncidentCard: React.FC<IncidentCardProps> = ({ incident }) => {
  const navigate = useNavigate()

  const confidence =
    incident.aiConfidence !== undefined
      ? incident.aiConfidence <= 1
        ? Math.round(incident.aiConfidence * 100)
        : Math.round(incident.aiConfidence)
      : incident.aiAnalysis?.confidence
      ? Math.round(incident.aiAnalysis.confidence * 100)
      : null

  return (
    <Card
      interactive
      onClick={() => navigate(`/incidents/${incident.id}`)}
      className="p-5 flex flex-col justify-between space-y-4 group"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <IncidentSeverityBadge severity={incident.severity} />
          <IncidentStatusBadge status={incident.status} />
        </div>

        <h3 className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors text-sm sm:text-base leading-snug line-clamp-2">
          {incident.title}
        </h3>

        <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
          {incident.description}
        </p>
      </div>

      <div className="pt-3 border-t border-[#24324A]/60 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Service:</span>
          <span className="font-mono text-slate-200 px-2 py-0.5 rounded bg-[#0B1220] border border-[#24324A]">
            {incident.service}
          </span>
        </div>

        {confidence !== null && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-400" />
              AI Confidence:
            </span>
            <span className="font-semibold text-blue-400">{confidence}%</span>
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
          <span>{formatRelativeTime(incident.createdAt || incident.created_at)}</span>
          <span className="text-blue-400 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            Details <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Card>
  )
}
