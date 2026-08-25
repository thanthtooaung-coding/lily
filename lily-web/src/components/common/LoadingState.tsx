import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface LoadingStateProps {
  message?: string
  className?: string
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading data...',
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 text-center text-slate-400 space-y-3',
        className
      )}
    >
      <div className="relative">
        <div className="w-10 h-10 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
        <Loader2 className="w-5 h-5 text-blue-400 absolute inset-0 m-auto animate-pulse" />
      </div>
      <p className="text-xs sm:text-sm font-medium text-slate-300">{message}</p>
    </div>
  )
}
