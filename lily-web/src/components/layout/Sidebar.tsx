import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  AlertTriangle,
  ShieldCheck,
  Zap,
  Workflow,
  BarChart3,
  BookOpen,
  Settings,
  Sparkles,
} from 'lucide-react'
import { useApprovals } from '../../hooks/useApprovals'
import { useSystemStatus } from '../../hooks/useSystemStatus'
import { StatusDot } from '../common/StatusDot'
import { cn } from '../../utils/cn'

interface SidebarProps {
  onNavClick?: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavClick }) => {
  const { data: approvals } = useApprovals('PENDING')
  const { data: systemHealth } = useSystemStatus()
  const pendingApprovalsCount = approvals?.length || 0

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Incidents', path: '/incidents', icon: AlertTriangle },
    {
      label: 'Approvals',
      path: '/approvals',
      icon: ShieldCheck,
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
    },
    { label: 'Actions', path: '/actions', icon: Zap },
    { label: 'Automation', path: '/automation', icon: Workflow },
    { label: 'Reports', path: '/reports', icon: BarChart3 },
    { label: 'User Manual', path: '/guide', icon: BookOpen },
  ]

  return (
    <aside className="w-64 h-screen bg-[#070C15] border-r border-[#24324A]/70 flex flex-col justify-between shrink-0 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-6 pb-5 flex items-center gap-3 border-b border-[#24324A]/50">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-600/30 border border-blue-400/30">
            <Sparkles className="w-5 h-5 fill-white text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-slate-100 tracking-tight">Lily</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">
              Incident Response & Ops
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3.5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onNavClick}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group',
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-900/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-[#151F32]'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={cn(
                          'w-4 h-4 transition-colors',
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                        )}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded-full text-xs font-bold transition-colors',
                          isActive
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* Bottom Footer Section */}
      <div className="p-3.5 border-t border-[#24324A]/50 space-y-2">
        <NavLink
          to="/settings"
          onClick={onNavClick}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
              isActive
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-100 hover:bg-[#151F32]'
            )
          }
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </NavLink>

        {/* System Status Pill */}
        <div className="p-3 rounded-xl bg-[#151F32] border border-[#24324A]/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StatusDot
              status={systemHealth?.allOperational ? 'operational' : 'degraded'}
              size="sm"
            />
            <span className="text-xs font-medium text-slate-300">
              {systemHealth?.allOperational ? 'All Systems Operational' : 'Degraded Performance'}
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}
