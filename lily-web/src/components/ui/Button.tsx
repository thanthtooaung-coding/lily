import React, { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'success'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      leftIcon,
      rightIcon,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      xs: 'px-2.5 py-1 text-xs rounded-md gap-1.5',
      sm: 'px-3 py-1.5 text-xs font-medium rounded-lg gap-2',
      md: 'px-4 py-2 text-sm font-medium rounded-lg gap-2',
      lg: 'px-5 py-2.5 text-base font-medium rounded-xl gap-2.5',
    }[size]

    const variantClasses = {
      primary:
        'bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-900/30 active:scale-[0.98] border border-blue-500/30',
      secondary:
        'bg-[#1E293B] hover:bg-[#2A3B53] text-slate-200 border border-[#334155] active:scale-[0.98]',
      danger:
        'bg-red-600/90 hover:bg-red-500 text-white shadow-sm shadow-red-950/40 active:scale-[0.98] border border-red-500/30',
      success:
        'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm active:scale-[0.98] border border-emerald-500/30',
      outline:
        'bg-transparent hover:bg-blue-600/10 text-blue-400 border border-blue-500/30 hover:border-blue-400 active:scale-[0.98]',
      ghost:
        'bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white',
    }[variant]

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-150 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none font-medium',
          sizeClasses,
          variantClasses,
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'
