import React from 'react'
import { getSeverityConfig } from '../../utils/severity'
import { cn } from '../../utils/cn'

interface IncidentSeverityBadgeProps {
  severity?: string
  className?: string
}

export const IncidentSeverityBadge: React.FC<IncidentSeverityBadgeProps> = ({
  severity,
  className,
}) => {
  const config = getSeverityConfig(severity)

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-bold border tracking-wider',
        config.badgeClass,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', config.dotClass)} />
      {config.label}
    </span>
  )
}
