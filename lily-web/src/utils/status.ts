import type { IncidentStatus } from '../types/incident'
import type { ActionStatus } from '../types/action'
import type { ApprovalStatus } from '../types/approval'

export const INCIDENT_STATUS_CONFIG: Record<
  IncidentStatus,
  {
    label: string
    color: string
    badgeClass: string
    dotClass: string
    pulse?: boolean
  }
> = {
  OPEN: {
    label: 'Open',
    color: '#3B82F6',
    badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    dotClass: 'bg-blue-500',
  },
  ANALYZING: {
    label: 'Analyzing',
    color: '#60A5FA',
    badgeClass: 'bg-blue-600/20 text-blue-300 border-blue-400/40 animate-pulse-subtle',
    dotClass: 'bg-blue-400 animate-ping',
    pulse: true,
  },
  AWAITING_APPROVAL: {
    label: 'Awaiting Approval',
    color: '#F59E0B',
    badgeClass: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    dotClass: 'bg-amber-400',
    pulse: true,
  },
  APPROVED: {
    label: 'Approved',
    color: '#10B981',
    badgeClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    dotClass: 'bg-emerald-400',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    color: '#6366F1',
    badgeClass: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    dotClass: 'bg-indigo-400',
    pulse: true,
  },
  RESOLVED: {
    label: 'Resolved',
    color: '#10B981',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    dotClass: 'bg-emerald-500',
  },
  FAILED: {
    label: 'Failed',
    color: '#EF4444',
    badgeClass: 'bg-red-500/10 text-red-400 border-red-500/30',
    dotClass: 'bg-red-500',
  },
  CLOSED: {
    label: 'Closed',
    color: '#64748B',
    badgeClass: 'bg-slate-700/30 text-slate-400 border-slate-600/30',
    dotClass: 'bg-slate-500',
  },
}

export function getIncidentStatusConfig(status?: string | null) {
  const key = (status?.toUpperCase() || 'OPEN') as IncidentStatus
  return INCIDENT_STATUS_CONFIG[key] || INCIDENT_STATUS_CONFIG.OPEN
}

export const ACTION_STATUS_CONFIG: Record<
  ActionStatus,
  {
    label: string
    color: string
    badgeClass: string
    dotClass: string
    iconName?: string
  }
> = {
  PENDING: {
    label: 'Pending',
    color: '#94A3B8',
    badgeClass: 'bg-slate-700/40 text-slate-300 border-slate-600/40',
    dotClass: 'bg-slate-400',
  },
  APPROVED: {
    label: 'Approved',
    color: '#3B82F6',
    badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    dotClass: 'bg-blue-400',
  },
  RUNNING: {
    label: 'Running',
    color: '#60A5FA',
    badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
    dotClass: 'bg-blue-400 animate-ping',
  },
  SUCCESS: {
    label: 'Success',
    color: '#10B981',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    dotClass: 'bg-emerald-400',
  },
  FAILED: {
    label: 'Failed',
    color: '#EF4444',
    badgeClass: 'bg-red-500/10 text-red-400 border-red-500/30',
    dotClass: 'bg-red-500',
  },
  REJECTED: {
    label: 'Rejected',
    color: '#F43F5E',
    badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    dotClass: 'bg-rose-400',
  },
}

export function getActionStatusConfig(status?: string | null) {
  const key = (status?.toUpperCase() || 'PENDING') as ActionStatus
  return ACTION_STATUS_CONFIG[key] || ACTION_STATUS_CONFIG.PENDING
}

export const APPROVAL_STATUS_CONFIG: Record<
  ApprovalStatus,
  {
    label: string
    color: string
    badgeClass: string
  }
> = {
  PENDING: {
    label: 'Pending Approval',
    color: '#F59E0B',
    badgeClass: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  },
  APPROVED: {
    label: 'Approved',
    color: '#10B981',
    badgeClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
  },
  REJECTED: {
    label: 'Rejected',
    color: '#EF4444',
    badgeClass: 'bg-red-500/10 text-red-400 border-red-500/30',
  },
}

export function getApprovalStatusConfig(status?: string | null) {
  const key = (status?.toUpperCase() || 'PENDING') as ApprovalStatus
  return APPROVAL_STATUS_CONFIG[key] || APPROVAL_STATUS_CONFIG.PENDING
}
