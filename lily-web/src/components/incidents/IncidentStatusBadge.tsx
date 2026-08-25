import React from 'react'
import { getIncidentStatusConfig } from '../../utils/status'
import { cn } from '../../utils/cn'

interface IncidentStatusBadgeProps {
  status?: string
  className?: string
}

export const IncidentStatusBadge: React.FC<IncidentStatusBadgeProps> = ({
  status,
  className,
}) => {
  const config = getIncidentStatusConfig(status)

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border tracking-wide',
        config.badgeClass,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', config.dotClass)} />
      {config.label}
    </span>
  )
}
