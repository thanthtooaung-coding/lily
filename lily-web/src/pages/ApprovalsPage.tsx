import React, { useState } from 'react'
import { Clock, CheckCircle2, XCircle } from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { Tabs } from '../components/ui/Tabs'
import { ApprovalList } from '../components/approvals/ApprovalList'
import { LoadingState } from '../components/common/LoadingState'
import { ErrorState } from '../components/common/ErrorState'
import { useApprovals } from '../hooks/useApprovals'

export const ApprovalsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('PENDING')

  const { data: allApprovals, isLoading, isError, refetch } = useApprovals('ALL')

  if (isLoading) {
    return <LoadingState message="Loading governance approvals..." />
  }

  if (isError || !allApprovals) {
    return (
      <ErrorState
        title="Failed to load approvals"
        onRetry={() => refetch()}
      />
    )
  }

  const pendingList = allApprovals.filter((a) => a.status === 'PENDING')
  const approvedList = allApprovals.filter((a) => a.status === 'APPROVED')
  const rejectedList = allApprovals.filter((a) => a.status === 'REJECTED')

  const currentList =
    activeTab === 'PENDING'
      ? pendingList
      : activeTab === 'APPROVED'
      ? approvedList
      : rejectedList

  const tabs = [
    {
      key: 'PENDING',
      label: 'Pending Approvals',
      count: pendingList.length,
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    {
      key: 'APPROVED',
      label: 'Approved History',
      count: approvedList.length,
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
    {
      key: 'REJECTED',
      label: 'Rejected',
      count: rejectedList.length,
      icon: <XCircle className="w-3.5 h-3.5" />,
    },
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <PageHeader
        title="Remediation Approvals"
        subtitle="Review and authorize AI-formulated actions before automated execution."
        badge={
          pendingList.length > 0 ? (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
              {pendingList.length} Action{pendingList.length > 1 ? 's' : ''} Awaiting Review
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              All Clear ✓
            </span>
          )
        }
      />

      {/* Tabs navigation */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Approvals list */}
      <ApprovalList approvals={currentList} />
    </div>
  )
}
