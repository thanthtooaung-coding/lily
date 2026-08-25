import React from 'react'
import { X } from 'lucide-react'
import { Sidebar } from './Sidebar'

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#070C15] z-10 animate-in slide-in-from-left duration-200 shadow-2xl">
        <div className="absolute top-3 right-3 z-20">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="p-2 rounded-lg text-slate-400 hover:text-white bg-[#151F32]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <Sidebar onNavClick={onClose} />
      </div>
    </div>
  )
}
