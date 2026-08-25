export type ActionStatus = 'PENDING' | 'APPROVED' | 'RUNNING' | 'SUCCESS' | 'FAILED' | 'REJECTED'

export type ActionType = 
  | 'RESTART_SERVICE'
  | 'CLEAR_CACHE'
  | 'SCALE_SERVICE'
  | 'ROLLBACK_DEPLOY'
  | 'KILL_IDLE_CONNECTIONS'
  | 'FLUSH_QUEUE'
  | 'BLOCK_IP'
  | 'OTHER'

export interface IncidentAction {
  id: string
  incidentId: string
  incident_id?: string
  incidentTitle?: string
  actionType: ActionType | string
  action_type?: string
  type?: string
  description: string
  status: ActionStatus
  triggeredBy: string
  triggered_by?: string
  requestedBy?: string | null
  requested_by?: string | null
  approvedBy?: string | null
  approved_by?: string | null
  startedAt?: string | null
  started_at?: string | null
  completedAt?: string | null
  completed_at?: string | null
  result?: string | null
  errorMessage?: string | null
  error_message?: string | null
  createdAt: string
  created_at?: string
}
