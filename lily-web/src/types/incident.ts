export type IncidentSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export type IncidentStatus = 
  | 'OPEN'
  | 'ANALYZING'
  | 'AWAITING_APPROVAL'
  | 'APPROVED'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'FAILED'
  | 'CLOSED'

export type IncidentCategory = 
  | 'PERFORMANCE'
  | 'AVAILABILITY'
  | 'SECURITY'
  | 'DATABASE'
  | 'INFRASTRUCTURE'
  | 'NETWORK'
  | 'APPLICATION'
  | 'OTHER'

export interface AIAnalysis {
  severity: IncidentSeverity
  category: IncidentCategory | string
  confidence?: number // e.g. 0.92 or 92
  confidenceScore?: number
  impact: string
  urgency: string
  summary?: string
  reason?: string
  recommendedAction: string
  recommended_action?: string
  requiresApproval: boolean
  requires_approval?: boolean
}

export interface IncidentTimelineEvent {
  id: string
  title: string
  description?: string
  timestamp: string
  status?: IncidentStatus
  actor?: 'ai' | 'user' | 'system' | 'n8n' | 'fastapi'
  isCurrent?: boolean
  meta?: Record<string, unknown>
}

export interface Incident {
  id: string
  title: string
  description: string
  service: string
  environment: string
  severity: IncidentSeverity
  status: IncidentStatus
  category?: IncidentCategory | string
  source?: string
  impact?: string | null
  urgency?: string | null
  aiConfidence?: number
  aiSummary?: string
  recommendedAction?: string | null
  recommended_action?: string | null
  requiresApproval?: boolean
  requires_approval?: boolean
  aiAnalysis?: AIAnalysis | null
  ai_analysis?: Record<string, unknown> | null
  timeline?: IncidentTimelineEvent[]
  createdAt: string
  created_at?: string
  updatedAt: string
  updated_at?: string
  resolvedAt?: string | null
  resolved_at?: string | null
}

export interface CreateIncidentInput {
  title: string
  description: string
  service: string
  environment: string
  severity?: IncidentSeverity
  source?: string
}

export interface IncidentFilters {
  search?: string
  severity?: IncidentSeverity | 'ALL'
  status?: IncidentStatus | 'ALL'
  service?: string | 'ALL'
  environment?: string | 'ALL'
}
