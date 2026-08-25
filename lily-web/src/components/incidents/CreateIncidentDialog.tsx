import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AlertTriangle, Plus } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'
import { useCreateIncident } from '../../hooks/useIncidents'
import { SERVICES_LIST, ENVIRONMENTS } from '../../constants'

const createIncidentSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(255),
  description: z.string().min(5, 'Please provide a clear description of the incident'),
  service: z.string().min(1, 'Please select a service'),
  environment: z.string().min(1, 'Please select an environment'),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
})

type CreateIncidentFormData = z.infer<typeof createIncidentSchema>

interface CreateIncidentDialogProps {
  isOpen: boolean
  onClose: () => void
}

export const CreateIncidentDialog: React.FC<CreateIncidentDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const createMutation = useCreateIncident()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateIncidentFormData>({
    resolver: zodResolver(createIncidentSchema),
    defaultValues: {
      title: '',
      description: '',
      service: 'payment-api',
      environment: 'production',
      severity: 'HIGH',
    },
  })

  const onSubmit = async (data: CreateIncidentFormData) => {
    try {
      await createMutation.mutateAsync(data)
      reset()
      onClose()
    } catch (err) {
      // Handled by mutation toast
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Create New Incident</h2>
            <p className="text-xs text-slate-400">
              Declare an incident for Lily AI automated triage and remediation
            </p>
          </div>
        </div>
      }
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <Input
          label="Incident Title"
          placeholder="e.g. Payment API latency increased (>3500ms)"
          error={errors.title?.message}
          {...register('title')}
        />

        {/* Description */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-300">
            Description & Observed Symptoms
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Payment requests are taking longer than 3.5 seconds in production pods..."
            className="w-full bg-[#0B1220] border border-[#24324A] rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
            {...register('description')}
          />
          {errors.description && (
            <p className="text-xs text-red-400 font-medium">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Grid for Service & Environment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Service"
            error={errors.service?.message}
            {...register('service')}
          >
            {SERVICES_LIST.map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </Select>

          <Select
            label="Environment"
            error={errors.environment?.message}
            {...register('environment')}
          >
            {ENVIRONMENTS.map((env) => (
              <option key={env} value={env} className="capitalize">
                {env}
              </option>
            ))}
          </Select>
        </div>

        {/* Severity */}
        <Select
          label="Initial Severity Estimate"
          error={errors.severity?.message}
          {...register('severity')}
        >
          <option value="CRITICAL">CRITICAL — High business/revenue impact</option>
          <option value="HIGH">HIGH — Significant degradation or user failure</option>
          <option value="MEDIUM">MEDIUM — Moderate impact with workarounds</option>
          <option value="LOW">LOW — Minor anomaly or non-critical worker</option>
        </Select>

        <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-500/20 text-xs text-blue-300 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <span>
            Upon submission, Lily AI will instantly correlate logs and metrics, assign diagnostic confidence, and formulate an automated remediation proposal.
          </span>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#24324A]/60">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="submit"
            isLoading={isSubmitting || createMutation.isPending}
          >
            Create & Analyze Incident
          </Button>
        </div>
      </form>
    </Modal>
  )
}
