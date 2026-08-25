export const APP_NAME = 'Lily'
export const APP_SUBTITLE = 'AI Incident Response & Automation'

export const SERVICES_LIST = [
  'payment-api',
  'auth-service',
  'order-processor',
  'user-service',
  'notification-worker',
  'database-cluster',
  'redis-cache',
  'gateway-api',
] as const

export const ENVIRONMENTS = ['production', 'staging', 'development'] as const

export const REFRESH_INTERVALS = {
  ACTIVE_INCIDENT: 5000,
  DASHBOARD: 15000,
  SYSTEM_STATUS: 10000,
  APPROVALS: 8000,
  ACTIONS: 5000,
} as const
