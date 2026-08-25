import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchIncidents,
  fetchIncidentById,
  createIncident,
  triggerAIAnalysis,
  resolveIncident,
  closeIncident,
} from '../api/incidents'
import type { CreateIncidentInput, IncidentFilters } from '../types/incident'
import { useToast } from './useToast'
import { REFRESH_INTERVALS } from '../constants'

export function useIncidents(filters?: IncidentFilters) {
  return useQuery({
    queryKey: ['incidents', filters],
    queryFn: () => fetchIncidents(filters),
    refetchInterval: REFRESH_INTERVALS.ACTIVE_INCIDENT,
  })
}

export function useIncident(id: string) {
  return useQuery({
    queryKey: ['incident', id],
    queryFn: () => fetchIncidentById(id),
    enabled: Boolean(id),
    refetchInterval: (query) => {
      const status = query.state.data?.status
      if (status === 'ANALYZING' || status === 'IN_PROGRESS') {
        return 2000 // Fast polling while AI or Automation is running
      }
      return REFRESH_INTERVALS.ACTIVE_INCIDENT
    },
  })
}

export function useCreateIncident() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (input: CreateIncidentInput) => createIncident(input),
    onSuccess: (data) => {
      toast.success(`Incident "${data.title}" created. Lily AI analyzing...`, 'Incident Created')
      queryClient.invalidateQueries({ queryKey: ['incidents'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to create incident', 'Error')
    },
  })
}

export function useAnalyzeIncident() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (incidentId: string) => triggerAIAnalysis(incidentId),
    onSuccess: (data) => {
      toast.info('Lily AI analysis completed and recommendation generated.', 'AI Analysis')
      queryClient.invalidateQueries({ queryKey: ['incident', data.id] })
      queryClient.invalidateQueries({ queryKey: ['incidents'] })
      queryClient.invalidateQueries({ queryKey: ['approvals'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
    onError: (err: any) => {
      toast.error(err.message || 'AI analysis failed', 'Analysis Error')
    },
  })
}

export function useResolveIncident() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (incidentId: string) => resolveIncident(incidentId),
    onSuccess: (data) => {
      toast.success(`Incident "${data.title}" marked as resolved.`, 'Resolved')
      queryClient.invalidateQueries({ queryKey: ['incident', data.id] })
      queryClient.invalidateQueries({ queryKey: ['incidents'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to resolve incident', 'Error')
    },
  })
}

export function useCloseIncident() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (incidentId: string) => closeIncident(incidentId),
    onSuccess: (data) => {
      toast.info(`Incident "${data.title}" closed.`, 'Incident Closed')
      queryClient.invalidateQueries({ queryKey: ['incident', data.id] })
      queryClient.invalidateQueries({ queryKey: ['incidents'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to close incident', 'Error')
    },
  })
}
