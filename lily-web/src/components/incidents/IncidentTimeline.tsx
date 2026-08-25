import React from 'react'
import {
  Sparkles,
  Zap,
  Clock,
  Send,
  User,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { formatDateTime, formatRelativeTime } from '../../utils/formatDate'
import type { IncidentTimelineEvent, Incident } from '../../types/incident'

interface IncidentTimelineProps {
  incident: Incident
}

export const IncidentTimeline: React.FC<IncidentTimelineProps> = ({ incident }) => {
  const events: IncidentTimelineEvent[] =
    incident.timeline && incident.timeline.length > 0
      ? incident.timeline
      : [
          {
            id: 't-created',
            title: 'Incident Created',
            description: `Declared on ${incident.service} (${incident.environment})`,
            timestamp: incident.createdAt || incident.created_at || new Date().toISOString(),
            actor: 'system',
          },
          {
            id: 't-ai',
            title: 'Lily AI Analysis Completed',
            description: `Triaged with ${Math.round((incident.aiConfidence || 0.92) * 100)}% confidence`,
            timestamp: incident.updatedAt || incident.updated_at || new Date().toISOString(),
            actor: 'ai',
            isCurrent: incident.status === 'ANALYZING',
          },
          ...(incident.status === 'AWAITING_APPROVAL' ||
          incident.status === 'IN_PROGRESS' ||
          incident.status === 'RESOLVED' ||
          incident.status === 'CLOSED'
            ? [
                {
                  id: 't-approval',
                  title: 'Approval Requested',
                  description: 'Remediation dispatched to operator dashboard',
                  timestamp: incident.updatedAt || new Date().toISOString(),
                  actor: 'n8n' as const,
                  isCurrent: incident.status === 'AWAITING_APPROVAL',
                },
              ]
            : []),
          ...(incident.status === 'IN_PROGRESS' ||
          incident.status === 'RESOLVED' ||
          incident.status === 'CLOSED'
            ? [
                {
                  id: 't-running',
                  title: 'n8n Automation Executing',
                  description: 'Triggering FastAPI worker action and Telegram notification',
                  timestamp: incident.updatedAt || new Date().toISOString(),
                  actor: 'n8n' as const,
                  isCurrent: incident.status === 'IN_PROGRESS',
                },
              ]
            : []),
          ...(incident.status === 'RESOLVED' || incident.status === 'CLOSED'
            ? [
                {
                  id: 't-resolved',
                  title: 'Incident Resolved ✓',
                  description: 'All telemetry stabilized. Health check 200 OK.',
                  timestamp: incident.resolvedAt || incident.resolved_at || new Date().toISOString(),
                  actor: 'fastapi' as const,
                  isCurrent: true,
                },
              ]
            : []),
        ]

  const getActorIcon = (actor?: string) => {
    switch (actor) {
      case 'ai':
        return <Sparkles className="w-3.5 h-3.5 text-blue-400" />
      case 'n8n':
        return <Zap className="w-3.5 h-3.5 text-amber-400" />
      case 'user':
        return <User className="w-3.5 h-3.5 text-emerald-400" />
      case 'fastapi':
        return <Send className="w-3.5 h-3.5 text-blue-400" />
      default:
        return <Clock className="w-3.5 h-3.5 text-slate-400" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-bold">
          <Clock className="w-4 h-4 text-blue-400" />
          Incident Timeline & Audit Trail
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-600/30">
          {events.map((event, idx) => {
            const isLast = idx === events.length - 1
            const isCurrent = event.isCurrent || (isLast && incident.status !== 'RESOLVED')

            return (
              <div key={event.id} className="relative group">
                <div
                  className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    isCurrent
                      ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/50 ring-4 ring-blue-500/20 animate-pulse'
                      : event.actor === 'user'
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                      : 'bg-[#151F32] border-[#24324A] text-slate-400'
                  }`}
                >
                  {getActorIcon(event.actor)}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4
                      className={`text-xs sm:text-sm font-semibold ${
                        isCurrent ? 'text-blue-300 font-bold' : 'text-slate-200'
                      }`}
                    >
                      {event.title}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {formatRelativeTime(event.timestamp)} ({formatDateTime(event.timestamp)})
                    </span>
                  </div>

                  {event.description && (
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
