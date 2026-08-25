import React from 'react'
import { ApprovalCard } from './ApprovalCard'
import { EmptyState } from '../common/EmptyState'
import { ShieldCheck } from 'lucide-react'
import type { Approval } from '../../types/approval'

interface ApprovalListProps {
  approvals: Approval[]
}

export const ApprovalList: React.FC<ApprovalListProps> = ({ approvals }) => {
  if (approvals.length === 0) {
    return (
      <EmptyState
        icon={<ShieldCheck className="w-6 h-6 text-emerald-400" />}
        title="No pending approvals"
        description="All automated remediation proposals have been reviewed or executed."
      />
    )
  }

  return (
    <div className="space-y-4">
      {approvals.map((approval) => (
        <ApprovalCard key={approval.id} approval={approval} />
      ))}
    </div>
  )
}
