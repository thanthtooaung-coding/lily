import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchActions, executeAction } from '../api/actions'
import { useToast } from './useToast'
import { REFRESH_INTERVALS } from '../constants'

export function useActions() {
  return useQuery({
    queryKey: ['actions'],
    queryFn: () => fetchActions(),
    refetchInterval: REFRESH_INTERVALS.ACTIONS,
  })
}

export function useExecuteAction() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (actionId: string) => executeAction(actionId),
    onSuccess: (data) => {
      toast.success(`Action "${data.description}" dispatched.`, 'Automation Running')
      queryClient.invalidateQueries({ queryKey: ['actions'] })
      queryClient.invalidateQueries({ queryKey: ['incidents'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to execute action', 'Execution Error')
    },
  })
}
