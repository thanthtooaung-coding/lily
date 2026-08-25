import React from 'react'
import { cn } from '../../utils/cn'

export interface StatusDotProps {
  status?: 'operational' | 'degraded' | 'down' | 'active' | 'analyzing' | 'warning'
  pulse?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const StatusDot: React.FC<StatusDotProps> = ({
  status = 'operational',
  pulse = true,
  className,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3.5 h-3.5',
  }[size]

  const colorClasses = {
    operational: 'bg-emerald-500 shadow-emerald-500/50',
    active: 'bg-blue-500 shadow-blue-500/50',
    analyzing: 'bg-blue-400 shadow-blue-400/50',
    warning: 'bg-amber-500 shadow-amber-500/50',
    degraded: 'bg-orange-500 shadow-orange-500/50',
    down: 'bg-red-500 shadow-red-500/50',
  }[status]

  return (
    <span className="relative flex items-center justify-center">
      {pulse && (
        <span
          className={cn(
            'absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping',
            colorClasses
          )}
        />
      )}
      <span
        className={cn('relative inline-flex rounded-full shadow-sm', sizeClasses, colorClasses, className)}
      />
    </span>
  )
}
