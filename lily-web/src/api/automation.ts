import apiClient, { USE_MOCK_DATA } from './client'
import { mockStore } from './mockData'
import type { AutomationLog, N8nAutomationStatus } from '../types/automation'

export async function fetchAutomationStatus(): Promise<N8nAutomationStatus> {
  if (USE_MOCK_DATA) {
    return mockStore.n8nStatus
  }

  try {
    const response = await apiClient.get('/automation/status')
    return response.data
  } catch (err) {
    return mockStore.n8nStatus
  }
}

export async function fetchAutomationLogs(): Promise<AutomationLog[]> {
  if (USE_MOCK_DATA) {
    return mockStore.automationLogs
  }

  try {
    const response = await apiClient.get('/automation/logs')
    return response.data
  } catch (err) {
    return mockStore.automationLogs
  }
}
