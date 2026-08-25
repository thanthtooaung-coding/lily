import type { Incident } from './incident'

export interface DashboardMetrics {
  openIncidents: number
  openIncidentsTrend: string
  criticalIncidents: number
  criticalIncidentsStatus: string
  resolvedToday: number
  resolvedTrend: string
  avgResolutionTime: string
  avgResolutionTrend: string
}

export interface IncidentActivityPoint {
  time: string
  created: number
  resolved: number
}

export interface AIOverviewData {
  analyzedToday: number
  avgConfidence: number
  topCategory: string
  mostAffectedService: string
  actionsAutomated: number
  accuracyRate: number
}

export interface DashboardSummary {
  metrics: DashboardMetrics
  activity: IncidentActivityPoint[]
  recentIncidents: Incident[]
  aiOverview: AIOverviewData
}
