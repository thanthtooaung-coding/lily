import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Plus, ShieldCheck } from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { IncidentFilters } from '../components/incidents/IncidentFilters'
import { IncidentTable } from '../components/incidents/IncidentTable'
import { IncidentCard } from '../components/incidents/IncidentCard'
import { CreateIncidentDialog } from '../components/incidents/CreateIncidentDialog'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/common/EmptyState'
import { LoadingState } from '../components/common/LoadingState'
import { ErrorState } from '../components/common/ErrorState'
import { useIncidents } from '../hooks/useIncidents'
import type { IncidentFilters as FilterState } from '../types/incident'

export const IncidentsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const initialFilters: FilterState = useMemo(
    () => ({
      search: searchParams.get('search') || '',
      severity: (searchParams.get('severity') as any) || 'ALL',
      status: (searchParams.get('status') as any) || 'ALL',
      service: searchParams.get('service') || 'ALL',
    }),
    [searchParams]
  )

  const [filters, setFilters] = useState<FilterState>(initialFilters)

  const { data: incidents, isLoading, isError, refetch } = useIncidents(filters)

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    const nextParams = new URLSearchParams()
    if (newFilters.search) nextParams.set('search', newFilters.search)
    if (newFilters.severity && newFilters.severity !== 'ALL')
      nextParams.set('severity', newFilters.severity)
    if (newFilters.status && newFilters.status !== 'ALL')
      nextParams.set('status', newFilters.status)
    if (newFilters.service && newFilters.service !== 'ALL')
      nextParams.set('service', newFilters.service)
    setSearchParams(nextParams)
  }

  const handleReset = () => {
    const emptyFilters: FilterState = {
      search: '',
      severity: 'ALL',
      status: 'ALL',
      service: 'ALL',
    }
    setFilters(emptyFilters)
    setSearchParams(new URLSearchParams())
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <PageHeader
        title="Incidents"
        subtitle="Monitor, investigate, and auto-remediate production service disruptions."
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCreateOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Create Incident
          </Button>
        }
      />

      {/* Filter Controls */}
      <IncidentFilters
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleReset}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Main Content Area */}
      {isLoading ? (
        <LoadingState message="Loading incidents..." />
      ) : isError ? (
        <ErrorState
          title="Unable to load incidents"
          message="Please check backend connection and try again."
          onRetry={() => refetch()}
        />
      ) : !incidents || incidents.length === 0 ? (
        <EmptyState
          icon={<ShieldCheck className="w-6 h-6 text-emerald-400" />}
          title="No incidents found"
          description="Your microservices look completely healthy. Lily is keeping active watch."
          action={
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsCreateOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Create Incident
            </Button>
          }
        />
      ) : viewMode === 'table' ? (
        <IncidentTable incidents={incidents} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {incidents.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </div>
      )}

      <CreateIncidentDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  )
}
