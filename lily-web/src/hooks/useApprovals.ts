import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchApprovals, approveAction, rejectAction } from '../api/approvals'
import type { ApprovalDecision } from '../types/approval'
import { useToast } from './useToast'
import { REFRESH_INTERVALS } from '../constants'

export function useApprovals(statusFilter?: string) {
  return useQuery({
    queryKey: ['approvals', statusFilter],
    queryFn: () => fetchApprovals(statusFilter),
    refetchInterval: REFRESH_INTERVALS.APPROVALS,
  })
}

export function useApproveAction() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: ({ actionId, decision }: { actionId: string; decision?: ApprovalDecision }) =>
      approveAction(actionId, decision),
    onSuccess: () => {
      toast.success('Action approved. n8n automation workflow dispatched!', 'Approved ✓')
      queryClient.invalidateQueries({ queryKey: ['approvals'] })
      queryClient.invalidateQueries({ queryKey: ['incidents'] })
      queryClient.invalidateQueries({ queryKey: ['incident'] })
      queryClient.invalidateQueries({ queryKey: ['actions'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['automation'] })
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to approve action', 'Approval Error')
    },
  })
}

export function useRejectAction() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: ({ actionId, decision }: { actionId: string; decision?: ApprovalDecision }) =>
      rejectAction(actionId, decision),
    onSuccess: () => {
      toast.info('Action rejected. Incident status updated.', 'Action Rejected')
      queryClient.invalidateQueries({ queryKey: ['approvals'] })
      queryClient.invalidateQueries({ queryKey: ['incidents'] })
      queryClient.invalidateQueries({ queryKey: ['incident'] })
      queryClient.invalidateQueries({ queryKey: ['actions'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to reject action', 'Error')
    },
  })
}
