import React, { useState } from 'react'
import { Zap } from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { ActionHistory } from '../components/actions/ActionHistory'
import { ActionCard } from '../components/actions/ActionCard'
import { LoadingState } from '../components/common/LoadingState'
import { ErrorState } from '../components/common/ErrorState'
import { useActions } from '../hooks/useActions'

export const ActionsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const { data: actions, isLoading, isError, refetch } = useActions()

  if (isLoading) {
    return <LoadingState message="Loading remediation actions history..." />
  }

  if (isError || !actions) {
    return (
      <ErrorState
        title="Failed to load actions"
        onRetry={() => refetch()}
      />
    )
  }

  const runningActions = actions.filter((a) => a.status === 'RUNNING')

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <PageHeader
        title="Remediation Actions"
        subtitle="Live audit trail of autonomous and operator-approved infrastructure actions."
        badge={
          runningActions.length > 0 ? (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/40 animate-pulse flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              {runningActions.length} Action{runningActions.length > 1 ? 's' : ''} Running Now
            </span>
          ) : undefined
        }
        actions={
          <div className="flex items-center bg-[#0B1220] border border-[#24324A] rounded-lg p-1 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Table
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                viewMode === 'cards' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Cards
            </button>
          </div>
        }
      />

      {/* Main content */}
      {viewMode === 'table' ? (
        <ActionHistory actions={actions} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((act) => (
            <ActionCard key={act.id} action={act} />
          ))}
        </div>
      )}
    </div>
  )
}
