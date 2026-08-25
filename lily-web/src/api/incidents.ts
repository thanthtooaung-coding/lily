import apiClient, { USE_MOCK_DATA } from './client'
import { mockStore } from './mockData'
import type { Incident, CreateIncidentInput, IncidentFilters } from '../types/incident'

export async function fetchIncidents(filters?: IncidentFilters): Promise<Incident[]> {
  if (USE_MOCK_DATA) {
    let list = [...mockStore.incidents]
    if (filters?.search) {
      const q = filters.search.toLowerCase()
      list = list.filter(
        i =>
          i.title.toLowerCase().includes(q) ||
          i.service.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      )
    }
    if (filters?.severity && filters.severity !== 'ALL') {
      list = list.filter(i => i.severity === filters.severity)
    }
    if (filters?.status && filters.status !== 'ALL') {
      list = list.filter(i => i.status === filters.status)
    }
    if (filters?.service && filters.service !== 'ALL') {
      list = list.filter(i => i.service === filters.service)
    }
    return list
  }

  try {
    const params: Record<string, string | undefined> = {}
    if (filters?.status && filters.status !== 'ALL') params.status = filters.status
    if (filters?.severity && filters.severity !== 'ALL') params.severity = filters.severity
    if (filters?.service && filters.service !== 'ALL') params.service = filters.service

    const response = await apiClient.get('/incidents', { params })
    const data = response.data
    // FastAPI returns { items: [...], total, page, page_size } or [...]
    return Array.isArray(data) ? data : data.items || []
  } catch (err) {
    console.warn('Backend unavailable, falling back to mock incidents data', err)
    return mockStore.incidents
  }
}

export async function fetchIncidentById(id: string): Promise<Incident> {
  if (USE_MOCK_DATA) {
    const incident = mockStore.incidents.find(i => i.id === id)
    if (!incident) throw new Error(`Incident ${id} not found`)
    return incident
  }

  try {
    const response = await apiClient.get(`/incidents/${id}`)
    return response.data
  } catch (err) {
    const mock = mockStore.incidents.find(i => i.id === id)
    if (mock) return mock
    throw err
  }
}

export async function createIncident(input: CreateIncidentInput): Promise<Incident> {
  if (USE_MOCK_DATA) {
    return mockStore.createIncident(input)
  }

  try {
    const response = await apiClient.post('/incidents', input)
    return response.data
  } catch (err) {
    console.warn('Backend unavailable, creating in mock store', err)
    return mockStore.createIncident(input)
  }
}

export async function triggerAIAnalysis(incidentId: string): Promise<Incident> {
  if (USE_MOCK_DATA) {
    const updated = mockStore.completeAIAnalysis(incidentId)
    if (!updated) throw new Error('Incident not found')
    return updated
  }

  try {
    const response = await apiClient.post(`/incidents/${incidentId}/analyze`)
    return response.data
  } catch (err) {
    console.warn('Backend analyze endpoint error, running mock analysis', err)
    const updated = mockStore.completeAIAnalysis(incidentId)
    if (updated) return updated
    throw err
  }
}

export async function resolveIncident(incidentId: string): Promise<Incident> {
  if (USE_MOCK_DATA) {
    mockStore.resolveRemediation(incidentId)
    const inc = mockStore.incidents.find(i => i.id === incidentId)
    if (!inc) throw new Error('Incident not found')
    return inc
  }

  try {
    const response = await apiClient.post(`/incidents/${incidentId}/resolve`)
    return response.data
  } catch (err) {
    mockStore.resolveRemediation(incidentId)
    const inc = mockStore.incidents.find(i => i.id === incidentId)
    if (inc) return inc
    throw err
  }
}

export async function closeIncident(incidentId: string): Promise<Incident> {
  if (USE_MOCK_DATA) {
    const inc = mockStore.incidents.find(i => i.id === incidentId)
    if (inc) {
      inc.status = 'CLOSED'
      inc.updatedAt = new Date().toISOString()
      return inc
    }
    throw new Error('Incident not found')
  }

  try {
    const response = await apiClient.post(`/incidents/${incidentId}/close`)
    return response.data
  } catch (err) {
    const inc = mockStore.incidents.find(i => i.id === incidentId)
    if (inc) {
      inc.status = 'CLOSED'
      return inc
    }
    throw err
  }
}
