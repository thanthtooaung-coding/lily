import apiClient, { USE_MOCK_DATA } from './client'
import { mockStore } from './mockData'
import type { DashboardSummary } from '../types/dashboard'

export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  if (USE_MOCK_DATA) {
    return mockStore.getDashboardSummary()
  }

  try {
    const response = await apiClient.get('/dashboard/summary')
    return response.data
  } catch (err) {
    console.warn('Dashboard API unreachable, returning calculated mock summary', err)
    return mockStore.getDashboardSummary()
  }
}
