import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Menu,
  Bell,
  Search,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Plus,
  BookOpen,
} from 'lucide-react'
import { useSystemStatus } from '../../hooks/useSystemStatus'
import { useApprovals } from '../../hooks/useApprovals'
import { Button } from '../ui/Button'
import { CreateIncidentDialog } from '../incidents/CreateIncidentDialog'

interface TopbarProps {
  onOpenMobileMenu: () => void
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenMobileMenu }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { data: systemHealth } = useSystemStatus()
  const { data: pendingApprovals } = useApprovals('PENDING')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Map route to page title
  const getPageTitle = () => {
    const path = location.pathname
    if (path.startsWith('/incidents/')) return 'Incident Details'
    if (path === '/incidents') return 'Incidents'
    if (path === '/approvals') return 'Approvals'
    if (path === '/actions') return 'Actions'
    if (path === '/automation') return 'Automation Orchestration'
    if (path === '/reports') return 'Reports & Analytics'
    if (path === '/guide') return 'User Manual & Guide'
    if (path === '/settings') return 'Platform Settings'
    return 'Dashboard'
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/incidents?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <>
      <header className="h-16 px-4 sm:px-6 bg-[#0B1220]/80 backdrop-blur-md border-b border-[#24324A]/60 flex items-center justify-between sticky top-0 z-30">
        {/* Left Side: Mobile Menu Button + Current Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open sidebar navigation"
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#151F32]"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* Center / Right Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick Search */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex relative items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search (Ctrl + K)..."
              className="w-56 lg:w-72 bg-[#151F32] border border-[#24324A] rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:w-80 transition-all duration-200"
            />
          </form>

          {/* Quick Link: User Manual */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/guide')}
            leftIcon={<BookOpen className="w-4 h-4 text-blue-400" />}
            className="hidden lg:inline-flex text-xs text-slate-300"
          >
            User Manual
          </Button>

          {/* Quick Action: New Incident */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCreateOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
            className="hidden sm:inline-flex"
          >
            Create Incident
          </Button>

          {/* Live Status Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#151F32] border border-[#24324A] text-xs text-slate-300 font-medium">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>{systemHealth?.allOperational ? 'Operational' : 'Degraded'}</span>
          </div>

          {/* Notifications Dropdown Toggle */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="View notifications"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-[#151F32] transition-colors relative cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              {pendingApprovals && pendingApprovals.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-[#0B1220] animate-ping" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#151F32] border border-[#24324A] rounded-xl shadow-2xl p-4 text-slate-100 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#24324A]">
                  <span className="text-xs font-semibold text-slate-200">Recent Alerts</span>
                  <span className="text-[10px] text-blue-400 font-medium">Live Feed</span>
                </div>
                <div className="space-y-2.5 max-h-64 overflow-y-auto">
                  {pendingApprovals && pendingApprovals.length > 0 ? (
                    pendingApprovals.map((appr) => (
                      <div
                        key={appr.id}
                        onClick={() => {
                          setShowNotifications(false)
                          navigate('/approvals')
                        }}
                        className="p-2 rounded-lg bg-[#0B1220] border border-amber-500/20 hover:border-amber-500/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Action Awaiting Approval</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-1 line-clamp-1">
                          {appr.incidentTitle}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>No pending alerts or approvals</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-[#24324A]/60">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-500 border border-blue-400/40 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              VT
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-semibold text-slate-200">Operator</p>
              <p className="text-[10px] text-slate-400">DevOps On-Call</p>
            </div>
          </div>
        </div>
      </header>

      <CreateIncidentDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </>
  )
}
