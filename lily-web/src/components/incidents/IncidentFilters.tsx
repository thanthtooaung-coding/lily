import React from 'react'
import { RotateCcw } from 'lucide-react'
import { SearchInput } from '../common/SearchInput'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'
import { SERVICES_LIST } from '../../constants'
import type { IncidentFilters as FilterState } from '../../types/incident'

interface IncidentFiltersProps {
  filters: FilterState
  onChange: (newFilters: FilterState) => void
  onReset: () => void
  viewMode: 'table' | 'cards'
  onViewModeChange: (mode: 'table' | 'cards') => void
}

export const IncidentFilters: React.FC<IncidentFiltersProps> = ({
  filters,
  onChange,
  onReset,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-4 bg-[#151F32] border border-[#24324A] rounded-xl">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row flex-1 items-stretch sm:items-center gap-3">
        <SearchInput
          value={filters.search || ''}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          onClear={() => onChange({ ...filters, search: '' })}
          placeholder="Filter by title, service, error..."
          className="max-w-xs"
        />

        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
          <Select
            value={filters.severity || 'ALL'}
            onChange={(e) => onChange({ ...filters, severity: e.target.value as any })}
            className="text-xs py-1.5"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </Select>

          <Select
            value={filters.status || 'ALL'}
            onChange={(e) => onChange({ ...filters, status: e.target.value as any })}
            className="text-xs py-1.5"
          >
            <option value="ALL">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="ANALYZING">Analyzing</option>
            <option value="AWAITING_APPROVAL">Awaiting Approval</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </Select>

          <Select
            value={filters.service || 'ALL'}
            onChange={(e) => onChange({ ...filters, service: e.target.value })}
            className="text-xs py-1.5 hidden md:block"
          >
            <option value="ALL">All Services</option>
            {SERVICES_LIST.map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </Select>

          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            className="text-slate-400 text-xs"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center self-end lg:self-center bg-[#0B1220] border border-[#24324A] rounded-lg p-1 text-xs">
        <button
          type="button"
          onClick={() => onViewModeChange('table')}
          className={`px-3 py-1 rounded font-medium transition-colors ${
            viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Table View
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange('cards')}
          className={`px-3 py-1 rounded font-medium transition-colors ${
            viewMode === 'cards' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Card View
        </button>
      </div>
    </div>
  )
}
