import React from 'react'
import { getActionStatusConfig } from '../../utils/status'
import { cn } from '../../utils/cn'

interface ActionStatusBadgeProps {
  status?: string
  className?: string
}

export const ActionStatusBadge: React.FC<ActionStatusBadgeProps> = ({
  status,
  className,
}) => {
  const config = getActionStatusConfig(status)

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
