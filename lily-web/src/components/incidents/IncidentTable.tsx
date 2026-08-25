import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Sparkles } from 'lucide-react'
import { IncidentSeverityBadge } from './IncidentSeverityBadge'
import { IncidentStatusBadge } from './IncidentStatusBadge'
import { Button } from '../ui/Button'
import { formatRelativeTime } from '../../utils/formatDate'
import type { Incident } from '../../types/incident'

interface IncidentTableProps {
  incidents: Incident[]
}

export const IncidentTable: React.FC<IncidentTableProps> = ({ incidents }) => {
  const navigate = useNavigate()

  return (
    <div className="bg-[#151F32] border border-[#24324A] rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#24324A] bg-[#0F172A]/50 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-4">Title & Details</th>
              <th className="py-3.5 px-4">Severity</th>
              <th className="py-3.5 px-4">Service</th>
              <th className="py-3.5 px-4">Environment</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">AI Confidence</th>
              <th className="py-3.5 px-4">Created</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#24324A]/60">
            {incidents.map((incident) => {
              const confidence =
                incident.aiConfidence !== undefined
                  ? incident.aiConfidence <= 1
                    ? Math.round(incident.aiConfidence * 100)
                    : Math.round(incident.aiConfidence)
                  : incident.aiAnalysis?.confidence
                  ? Math.round(incident.aiAnalysis.confidence * 100)
                  : null

              return (
                <tr
                  key={incident.id}
                  onClick={() => navigate(`/incidents/${incident.id}`)}
                  className="hover:bg-[#1E293B]/70 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4">
                    <div className="max-w-md">
                      <span className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors text-sm">
                        {incident.title}
                      </span>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {incident.description}
                      </p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <IncidentSeverityBadge severity={incident.severity} />
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-200">
                    <span className="px-2 py-0.5 rounded bg-[#0B1220] border border-[#24324A]">
                      {incident.service}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 capitalize">
                    {incident.environment}
                  </td>
                  <td className="py-3.5 px-4">
                    <IncidentStatusBadge status={incident.status} />
                  </td>
                  <td className="py-3.5 px-4">
                    {confidence !== null ? (
                      <div className="flex items-center gap-1.5 font-semibold text-blue-300">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        <span>{confidence}%</span>
                      </div>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                    {formatRelativeTime(incident.createdAt || incident.created_at)}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="ghost"
                      size="xs"
                      className="text-blue-400 group-hover:text-blue-300"
                      rightIcon={<ChevronRight className="w-4 h-4" />}
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/incidents/${incident.id}`)
                      }}
                    >
                      Investigate
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
