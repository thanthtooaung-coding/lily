import { useQuery } from '@tanstack/react-query'
import { fetchAutomationStatus, fetchAutomationLogs } from '../api/automation'
import { REFRESH_INTERVALS } from '../constants'

export function useAutomationStatus() {
  return useQuery({
    queryKey: ['automation', 'status'],
    queryFn: () => fetchAutomationStatus(),
    refetchInterval: REFRESH_INTERVALS.SYSTEM_STATUS,
  })
}

export function useAutomationLogs() {
  return useQuery({
    queryKey: ['automation', 'logs'],
    queryFn: () => fetchAutomationLogs(),
    refetchInterval: REFRESH_INTERVALS.SYSTEM_STATUS,
  })
}
