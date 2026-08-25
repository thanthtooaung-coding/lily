import { useQuery } from '@tanstack/react-query'
import { fetchSystemHealth } from '../api/system'
import { REFRESH_INTERVALS } from '../constants'

export function useSystemStatus() {
  return useQuery({
    queryKey: ['system', 'health'],
    queryFn: () => fetchSystemHealth(),
    refetchInterval: REFRESH_INTERVALS.SYSTEM_STATUS,
  })
}
