import React from 'react'
import { ShieldCheck } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-[#151F32]/50 border border-[#24324A] rounded-xl my-4',
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 shadow-inner">
        {icon || <ShieldCheck className="w-6 h-6" />}
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-slate-100 mb-1">{title}</h3>
      {description && (
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
          {description}
        </p>
      )}
      {action}
    </div>
  )
}
