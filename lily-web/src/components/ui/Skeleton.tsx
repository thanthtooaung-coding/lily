import React from 'react'
import { cn } from '../../utils/cn'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-[#1E293B]/70 border border-[#24324A]/40',
        className
      )}
      {...props}
    />
  )
}

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="w-full space-y-3">
    <div className="h-10 bg-[#1E293B]/50 rounded-lg" />
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="h-14 bg-[#151F32] border border-[#24324A]/50 rounded-lg flex items-center px-4 space-x-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/6" />
        <Skeleton className="h-4 w-1/6" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-12 ml-auto" />
      </div>
    ))}
  </div>
)

export const CardSkeleton: React.FC = () => (
  <div className="bg-[#151F32] border border-[#24324A] rounded-xl p-6 space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-6 rounded-full" />
    </div>
    <Skeleton className="h-8 w-20" />
    <Skeleton className="h-3 w-32" />
  </div>
)
