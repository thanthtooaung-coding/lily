import React, { useState } from 'react'
import { XCircle } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { useRejectAction } from '../../hooks/useApprovals'
import type { Approval } from '../../types/approval'

interface RejectDialogProps {
  approval: Approval | null
  isOpen: boolean
  onClose: () => void
}

export const RejectDialog: React.FC<RejectDialogProps> = ({
  approval,
  isOpen,
  onClose,
}) => {
  const rejectMutation = useRejectAction()
  const [reason, setReason] = useState('')

  if (!approval) return null

  const handleReject = async () => {
    try {
      await rejectMutation.mutateAsync({
        actionId: approval.id || approval.actionId || approval.incidentId,
        decision: {
          comment: reason.trim() || 'Rejected by operator after manual review.',
          responded_by: 'DevOps Operator (Alex M.)',
        },
      })
      onClose()
    } catch (err) {
      // Handled
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Reject automated action?</h2>
            <p className="text-xs text-slate-400">
              The recommended action will be cancelled and the incident will remain open.
            </p>
          </div>
        </div>
      }
      size="md"
    >
      <div className="space-y-4">
        <div className="p-3 rounded-lg bg-[#0B1220] border border-[#24324A] text-xs space-y-1">
          <span className="text-slate-400">Target:</span>
          <p className="font-semibold text-slate-200">{approval.incidentTitle}</p>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-300">
            Reason for rejection (Optional)
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Traffic is expected to spike for marketing event; manual scaling preferred."
            className="w-full bg-[#0B1220] border border-[#24324A] rounded-lg px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#24324A]/60">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={rejectMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleReject}
            isLoading={rejectMutation.isPending}
          >
            Reject Action
          </Button>
        </div>
      </div>
    </Modal>
  )
}
