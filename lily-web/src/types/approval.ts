import type { IncidentSeverity } from './incident'

export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export interface Approval {
  id: string
  incidentId: string
  incident_id?: string
  actionId?: string
  action_id?: string
  incidentTitle: string
  incident_title?: string
  action: string
  actionType?: string
  reason: string
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | string
  risk_level?: string
  status: ApprovalStatus
  severity?: IncidentSeverity
  service?: string
  requestedAt: string
  requested_at?: string
  respondedAt?: string | null
  responded_at?: string | null
  respondedBy?: string | null
  responded_by?: string | null
  comment?: string | null
  createdAt?: string
  created_at?: string
}

export interface ApprovalDecision {
  comment?: string
  responded_by?: string
  respondedBy?: string
}
