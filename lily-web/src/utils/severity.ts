import type { IncidentSeverity } from '../types/incident'

export const SEVERITY_CONFIG: Record<
  IncidentSeverity,
  {
    label: string
    color: string
    bgColor: string
    borderColor: string
    badgeClass: string
    dotClass: string
    textColor: string
  }
> = {
  CRITICAL: {
    label: 'CRITICAL',
    color: '#EF4444',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    badgeClass: 'bg-red-500/10 text-red-400 border-red-500/25',
    dotClass: 'bg-red-500',
    textColor: 'text-red-400',
  },
  HIGH: {
    label: 'HIGH',
    color: '#F97316',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    badgeClass: 'bg-orange-500/10 text-orange-400 border-orange-500/25',
    dotClass: 'bg-orange-500',
    textColor: 'text-orange-400',
  },
  MEDIUM: {
    label: 'MEDIUM',
    color: '#F59E0B',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
    dotClass: 'bg-amber-500',
    textColor: 'text-amber-400',
  },
  LOW: {
    label: 'LOW',
    color: '#3B82F6',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
    dotClass: 'bg-blue-500',
    textColor: 'text-blue-400',
  },
}

export function getSeverityConfig(severity: string | undefined) {
  const normalized = (severity?.toUpperCase() || 'LOW') as IncidentSeverity
  return SEVERITY_CONFIG[normalized] || SEVERITY_CONFIG.LOW
}
