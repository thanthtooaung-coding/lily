import { useQuery } from '@tanstack/react-query'
import { fetchDashboardSummary } from '../api/dashboard'
import { REFRESH_INTERVALS } from '../constants'

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => fetchDashboardSummary(),
    refetchInterval: REFRESH_INTERVALS.DASHBOARD,
  })
}
