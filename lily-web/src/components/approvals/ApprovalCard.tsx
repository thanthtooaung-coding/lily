import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Zap,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { ApprovalDialog } from './ApprovalDialog'
import { RejectDialog } from './RejectDialog'
import { formatRelativeTime } from '../../utils/formatDate'
import type { Approval } from '../../types/approval'

interface ApprovalCardProps {
  approval: Approval
}

export const ApprovalCard: React.FC<ApprovalCardProps> = ({ approval }) => {
  const navigate = useNavigate()
  const [isApproveOpen, setIsApproveOpen] = useState(false)
  const [isRejectOpen, setIsRejectOpen] = useState(false)

  const isPending = approval.status === 'PENDING'

  return (
    <>
      <Card
        className={`p-5 sm:p-6 transition-all duration-200 ${
          isPending
            ? 'border-amber-500/40 bg-gradient-to-br from-[#151F32] to-[#141E2F] shadow-lg shadow-amber-950/10'
            : 'border-[#24324A] bg-[#151F32]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-bold border uppercase tracking-wider ${
                  isPending
                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    : approval.status === 'APPROVED'
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : 'bg-red-500/10 text-red-300 border-red-500/30'
                }`}
              >
                {approval.status}
              </span>

              <span className="text-xs text-slate-400">
                Requested {formatRelativeTime(approval.requestedAt || approval.createdAt)}
              </span>
            </div>

            <h3
              onClick={() => navigate(`/incidents/${approval.incidentId}`)}
              className="text-base sm:text-lg font-bold text-slate-100 hover:text-blue-400 transition-colors cursor-pointer pt-1"
            >
              {approval.incidentTitle}
            </h3>
          </div>

          <span
            className={`self-start px-2.5 py-1 rounded-lg text-xs font-bold border ${
              approval.riskLevel === 'HIGH' || approval.riskLevel === 'CRITICAL'
                ? 'bg-red-500/10 text-red-400 border-red-500/30'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}
          >
            {approval.riskLevel} RISK
          </span>
        </div>

        {/* Action Description */}
        <div className="mt-4 p-3.5 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-300">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>Recommended Autonomous Remediation:</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold font-mono text-slate-100">
            {approval.action}
          </p>
          {approval.reason && (
            <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-[#24324A]/60">
              <span className="text-slate-300 font-medium">Justification: </span>
              {approval.reason}
            </p>
          )}
        </div>

        {/* Operator audit feedback if already decided */}
        {!isPending && approval.respondedBy && (
          <div className="mt-3 p-3 rounded-lg bg-[#0B1220]/60 border border-[#24324A]/60 text-xs flex items-center justify-between text-slate-400">
            <span>
              {approval.status === 'APPROVED' ? 'Approved' : 'Rejected'} by{' '}
              <strong className="text-slate-200">{approval.respondedBy}</strong>
            </span>
            <span>{formatRelativeTime(approval.respondedAt)}</span>
          </div>
        )}

        {/* Actions Button Row */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#24324A]/60">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => navigate(`/incidents/${approval.incidentId}`)}
            rightIcon={<ArrowRight className="w-3 h-3" />}
            className="text-slate-400 hover:text-slate-200 text-xs"
          >
            View Incident Details
          </Button>

          {isPending && (
            <div className="flex items-center gap-2">
              <Button
                variant="danger"
                size="sm"
                onClick={() => setIsRejectOpen(true)}
                leftIcon={<XCircle className="w-4 h-4" />}
              >
                Reject
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsApproveOpen(true)}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Approve Action
              </Button>
            </div>
          )}
        </div>
      </Card>

      <ApprovalDialog
        approval={approval}
        isOpen={isApproveOpen}
        onClose={() => setIsApproveOpen(false)}
      />

      <RejectDialog
        approval={approval}
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
      />
    </>
  )
}
