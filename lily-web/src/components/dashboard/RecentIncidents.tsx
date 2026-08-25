import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { IncidentSeverityBadge } from '../incidents/IncidentSeverityBadge'
import { IncidentStatusBadge } from '../incidents/IncidentStatusBadge'
import { formatRelativeTime } from '../../utils/formatDate'
import type { Incident } from '../../types/incident'

interface RecentIncidentsProps {
  incidents?: Incident[]
}

export const RecentIncidents: React.FC<RecentIncidentsProps> = ({ incidents }) => {
  const navigate = useNavigate()

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle>Recent Incidents</CardTitle>
        </div>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => navigate('/incidents')}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          View all
        </Button>
      </CardHeader>

      <CardContent className="pt-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#24324A]/80 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="pb-3 pr-4">Incident</th>
                <th className="pb-3 px-3">Severity</th>
                <th className="pb-3 px-3">Service</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3">Created</th>
                <th className="pb-3 pl-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#24324A]/50">
              {incidents && incidents.length > 0 ? (
                incidents.map((incident) => (
                  <tr
                    key={incident.id}
                    onClick={() => navigate(`/incidents/${incident.id}`)}
                    className="hover:bg-[#1E293B]/60 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 pr-4 font-medium text-slate-100 max-w-xs truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold group-hover:text-blue-400 transition-colors">
                          {incident.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <IncidentSeverityBadge severity={incident.severity} />
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300">
                      {incident.service}
                    </td>
                    <td className="py-3 px-3">
                      <IncidentStatusBadge status={incident.status} />
                    </td>
                    <td className="py-3 px-3 text-slate-400">
                      {formatRelativeTime(incident.createdAt || incident.created_at)}
                    </td>
                    <td className="py-3 pl-3 text-right">
                      <Button
                        variant="ghost"
                        size="xs"
                        className="text-blue-400 group-hover:text-blue-300"
                        rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/incidents/${incident.id}`)
                        }}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-400">
                    No recent incidents. All systems healthy.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
