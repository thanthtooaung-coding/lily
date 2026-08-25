import React from 'react'
import { Card } from '../ui/Card'
import { cn } from '../../utils/cn'

export interface MetricCardProps {
  title: string
  value: string | number
  trend?: string
  trendType?: 'positive' | 'negative' | 'neutral' | 'warning' | 'critical'
  icon?: React.ReactNode
  subtitle?: string
  className?: string
  onClick?: () => void
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  trendType = 'neutral',
  icon,
  subtitle,
  className,
  onClick,
}) => {
  const trendClasses = {
    positive: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    negative: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    warning: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    critical: 'text-red-400 bg-red-500/10 border-red-500/20',
    neutral: 'text-slate-400 bg-slate-800/60 border-slate-700/60',
  }[trendType]

  return (
    <Card
      interactive={Boolean(onClick)}
      onClick={onClick}
      className={cn('p-5 sm:p-6 transition-all duration-150', className)}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        {icon && (
          <div className="p-2 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-3">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100">
          {value}
        </span>
        {trend && (
          <span
            className={cn(
              'px-2 py-0.5 rounded-md text-[11px] font-semibold border inline-flex items-center gap-1',
              trendClasses
            )}
          >
            {trend}
          </span>
        )}
      </div>

      {subtitle && <p className="text-xs text-slate-400 mt-2">{subtitle}</p>}
    </Card>
  )
}
