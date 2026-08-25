import React, { useState } from 'react'
import { ShieldCheck, Zap } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { useApproveAction } from '../../hooks/useApprovals'
import type { Approval } from '../../types/approval'

interface ApprovalDialogProps {
  approval: Approval | null
  isOpen: boolean
  onClose: () => void
}

export const ApprovalDialog: React.FC<ApprovalDialogProps> = ({
  approval,
  isOpen,
  onClose,
}) => {
  const approveMutation = useApproveAction()
  const [comment, setComment] = useState('')

  if (!approval) return null

  const handleApprove = async () => {
    try {
      await approveMutation.mutateAsync({
        actionId: approval.id || approval.actionId || approval.incidentId,
        decision: {
          comment: comment.trim() || undefined,
          responded_by: 'DevOps Operator (Alex M.)',
        },
      })
      onClose()
    } catch (err) {
      // Toast handled by mutation
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Approve automated action?</h2>
            <p className="text-xs text-slate-400">
              Lily will trigger the recommended remediation workflow via n8n.
            </p>
          </div>
        </div>
      }
      size="md"
    >
      <div className="space-y-4">
        {/* Incident details box */}
        <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Target Incident:</span>
            <span className="font-semibold text-slate-200">
              {approval.incidentTitle || 'Active Incident'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Action:</span>
            <span className="font-mono font-semibold text-blue-400">
              {approval.action}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Risk Assessment:</span>
            <span
              className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                approval.riskLevel === 'HIGH'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}
            >
              {approval.riskLevel} RISK
            </span>
          </div>

          {approval.reason && (
            <p className="text-xs text-slate-300 pt-1 border-t border-[#24324A]/60">
              <span className="font-medium text-slate-400">Reason: </span>
              {approval.reason}
            </p>
          )}
        </div>

        {/* Optional Operator Comment */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-300">
            Approval Note / Audit Comment (Optional)
          </label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="e.g. Verified database connection backlog. Safe to restart."
            className="w-full bg-[#0B1220] border border-[#24324A] rounded-lg px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#24324A]/60">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={approveMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleApprove}
            isLoading={approveMutation.isPending}
            leftIcon={<Zap className="w-4 h-4" />}
          >
            Approve Action
          </Button>
        </div>
      </div>
    </Modal>
  )
}
