import apiClient, { USE_MOCK_DATA } from './client'
import { mockStore } from './mockData'
import type { Approval, ApprovalDecision } from '../types/approval'

export async function fetchApprovals(statusFilter?: string): Promise<Approval[]> {
  if (USE_MOCK_DATA) {
    if (statusFilter && statusFilter !== 'ALL') {
      return mockStore.approvals.filter(a => a.status === statusFilter)
    }
    return mockStore.approvals
  }

  try {
    const response = await apiClient.get('/approvals/pending')
    const list = Array.isArray(response.data) ? response.data : []
    // Map backend snake_case fields if present
    return list.map((item: any) => ({
      id: item.id || item.action_id,
      incidentId: item.incident_id || item.incidentId,
      incidentTitle: item.incident_title || item.incidentTitle || 'Active Incident',
      action: item.action || item.description || 'Remediation Action',
      reason: item.reason || item.comment || 'Requires operator approval',
      riskLevel: item.risk_level || item.riskLevel || 'MEDIUM',
      status: item.status || 'PENDING',
      requestedAt: item.requested_at || item.requestedAt || new Date().toISOString(),
      respondedAt: item.responded_at || item.respondedAt,
      respondedBy: item.responded_by || item.respondedBy,
      comment: item.comment,
    }))
  } catch (err) {
    console.warn('Approvals API fallback', err)
    if (statusFilter && statusFilter !== 'ALL') {
      return mockStore.approvals.filter(a => a.status === statusFilter)
    }
    return mockStore.approvals
  }
}

export async function approveAction(
  actionIdOrApprovalId: string,
  decision?: ApprovalDecision
): Promise<{ success: boolean }> {
  if (USE_MOCK_DATA) {
    return mockStore.approveAction(actionIdOrApprovalId, decision)
  }

  try {
    await apiClient.post(`/actions/${actionIdOrApprovalId}/approve`, {
      responded_by: decision?.responded_by || 'operator',
      comment: decision?.comment || 'Approved',
    })
    // Also trigger mock state synchronization if dual-running
    mockStore.approveAction(actionIdOrApprovalId, decision)
    return { success: true }
  } catch (err) {
    console.warn('Approve action failed on backend, executing mock fallback', err)
    return mockStore.approveAction(actionIdOrApprovalId, decision)
  }
}

export async function rejectAction(
  actionIdOrApprovalId: string,
  decision?: ApprovalDecision
): Promise<{ success: boolean }> {
  if (USE_MOCK_DATA) {
    return mockStore.rejectAction(actionIdOrApprovalId, decision)
  }

  try {
    await apiClient.post(`/actions/${actionIdOrApprovalId}/reject`, {
      responded_by: decision?.responded_by || 'operator',
      comment: decision?.comment || 'Rejected',
    })
    mockStore.rejectAction(actionIdOrApprovalId, decision)
    return { success: true }
  } catch (err) {
    console.warn('Reject action failed on backend, executing mock fallback', err)
    return mockStore.rejectAction(actionIdOrApprovalId, decision)
  }
}
