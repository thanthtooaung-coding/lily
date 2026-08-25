export interface SystemServiceStatus {
  name: string
  key: string
  status: 'OPERATIONAL' | 'DEGRADED' | 'DOWN' | 'CONNECTED'
  latencyMs?: number
  lastChecked: string
  message?: string
}

export interface SystemHealth {
  allOperational: boolean
  lastChecked: string
  services: SystemServiceStatus[]
}
