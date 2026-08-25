import React from 'react'
import { Workflow } from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { WorkflowDiagram } from '../components/automation/WorkflowDiagram'
import { AutomationCard } from '../components/automation/AutomationCard'
import { AutomationLog } from '../components/automation/AutomationLog'

export const AutomationPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      <PageHeader
        title="Automation Orchestration"
        subtitle="Lily orchestrates deterministic incident triage and remediation workflows powered by n8n."
        badge={
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
            <Workflow className="w-3.5 h-3.5 text-indigo-400" />
            n8n Event-Driven Pipeline
          </span>
        }
      />

      {/* Visual Workflow Diagram */}
      <WorkflowDiagram />

      {/* n8n Engine Status Card */}
      <AutomationCard />

      {/* Execution Logs */}
      <AutomationLog />
    </div>
  )
}
