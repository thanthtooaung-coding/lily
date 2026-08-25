import apiClient, { USE_MOCK_DATA } from './client'
import { mockStore } from './mockData'
import type { IncidentAction } from '../types/action'

export async function fetchActions(): Promise<IncidentAction[]> {
  if (USE_MOCK_DATA) {
    return mockStore.actions
  }

  try {
    const response = await apiClient.get('/actions')
    const list = Array.isArray(response.data) ? response.data : []
    return list.map((item: any) => ({
      id: item.id,
      incidentId: item.incident_id || item.incidentId,
      incidentTitle: item.incident_title || item.incidentTitle,
      actionType: item.action_type || item.actionType || 'OTHER',
      description: item.description,
      status: item.status,
      triggeredBy: item.triggered_by || item.requested_by || 'Operator',
      requestedBy: item.requested_by || item.requestedBy,
      approvedBy: item.approved_by || item.approvedBy,
      startedAt: item.started_at || item.startedAt,
      completedAt: item.completed_at || item.completedAt,
      result: item.result,
      errorMessage: item.error_message || item.errorMessage,
      createdAt: item.created_at || item.createdAt || new Date().toISOString(),
    }))
  } catch (err) {
    console.warn('Actions API fallback', err)
    return mockStore.actions
  }
}

export async function executeAction(actionId: string): Promise<IncidentAction> {
  if (USE_MOCK_DATA) {
    const act = mockStore.actions.find(a => a.id === actionId)
    if (!act) throw new Error('Action not found')
    act.status = 'RUNNING'
    act.startedAt = new Date().toISOString()
    setTimeout(() => {
      act.status = 'SUCCESS'
      act.completedAt = new Date().toISOString()
      act.result = 'Remediation completed successfully.'
    }, 2000)
    return act
  }

  try {
    const response = await apiClient.post(`/actions/${actionId}/execute`)
    return response.data
  } catch (err) {
    console.warn('Execute action fallback', err)
    const act = mockStore.actions.find(a => a.id === actionId)
    if (act) return act
    throw err
  }
}
