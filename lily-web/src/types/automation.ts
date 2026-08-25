export type WorkflowNodeStatus = 'IDLE' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'PENDING'

export interface WorkflowNode {
  id: string
  title: string
  subtitle?: string
  icon: string
  status: WorkflowNodeStatus
  description: string
  duration?: string
  details?: string
  lastExecuted?: string
}

export interface AutomationLog {
  id: string
  incidentId: string
  incidentTitle: string
  workflowName: string
  status: 'SUCCESS' | 'FAILED' | 'RUNNING'
  stepsCompleted: number
  totalSteps: number
  duration: string
  timestamp: string
}

export interface N8nAutomationStatus {
  service: string
  connected: boolean
  webhookStatus: string
  lastExecution: string
  successfulExecutions: number
  failedExecutions: number
  uptime: string
  activeWorkflows: number
}
