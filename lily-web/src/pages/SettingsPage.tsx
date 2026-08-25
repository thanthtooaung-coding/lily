import React, { useState } from 'react'
import {
  User,
  Bell,
  Workflow,
  Cpu,
  Database,
  Send,
  CheckCircle2,
  Save,
} from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useToast } from '../hooks/useToast'

export const SettingsPage: React.FC = () => {
  const toast = useToast()
  const [activeTab, setActiveTab] = useState<'integrations' | 'profile' | 'automation' | 'notifications'>('integrations')

  const handleSave = () => {
    toast.success('Configuration preferences saved successfully.', 'Settings Saved')
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <PageHeader
        title="Settings & Integrations"
        subtitle="Configure platform parameters, LLM diagnostics, and external webhook pipelines."
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Changes
          </Button>
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#24324A]/60 pb-3 text-xs sm:text-sm font-medium">
        {[
          { key: 'integrations', label: 'Integrations & Connectors', icon: Cpu },
          { key: 'automation', label: 'Automation Policies', icon: Workflow },
          { key: 'notifications', label: 'Telegram & Alerts', icon: Bell },
          { key: 'profile', label: 'Operator Profile', icon: User },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#151F32]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content: Integrations */}
      {activeTab === 'integrations' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* AI Engine */}
            <Card className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">Lily AI Engine</h4>
                    <p className="text-xs text-slate-400">LLM Root Cause Analyzer</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Connected ✓
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Autonomous diagnostic reasoning model configured via backend environment.
              </p>
            </Card>

            {/* n8n Automation Engine */}
            <Card className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                    <Workflow className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">n8n Workflow Engine</h4>
                    <p className="text-xs text-slate-400">Orchestration & Webhooks</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Connected ✓
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bidirectional webhooks enabled for automated remediation and approval escalation.
              </p>
            </Card>

            {/* Telegram Gateway */}
            <Card className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-sky-600/20 text-sky-400 border border-sky-500/30">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">Telegram Alert Bot</h4>
                    <p className="text-xs text-slate-400">Instant Messaging Gateway</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Connected ✓
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dispatches urgent incident cards and interactive approval prompts to Telegram channels.
              </p>
            </Card>

            {/* PostgreSQL Database */}
            <Card className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-700/20 text-blue-300 border border-blue-600/30">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">PostgreSQL Primary</h4>
                    <p className="text-xs text-slate-400">State & Audit Store</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Connected ✓
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                ACID transactional store tracking incident states, audit trails, and execution timelines.
              </p>
            </Card>
          </div>
        </div>
      )}

      {/* Tab Content: Automation */}
      {activeTab === 'automation' && (
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-100">Autonomous Execution Safeguards</h3>
          <div className="space-y-3 text-xs text-slate-300">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-[#0B1220] border border-[#24324A] cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-blue-600" />
              <div>
                <span className="font-semibold block text-slate-200">Require Human Approval for Critical Remediation</span>
                <span className="text-slate-400">All CRITICAL tier service restarts mandate operator verification.</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-[#0B1220] border border-[#24324A] cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-blue-600" />
              <div>
                <span className="font-semibold block text-slate-200">Auto-Remediate Low Risk Cache Flushes</span>
                <span className="text-slate-400">Permit instant execution for non-destructive key evictions.</span>
              </div>
            </label>
          </div>
        </Card>
      )}

      {/* Tab Content: Notifications */}
      {activeTab === 'notifications' && (
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-100">Alert Notification Channels</h3>
          <div className="space-y-3">
            <Input label="Telegram On-Call Channel ID" defaultValue="@lily_incident_alerts" />
            <Input label="Escalation SLA Timeout (Minutes)" defaultValue="15" type="number" />
          </div>
        </Card>
      )}

      {/* Tab Content: Profile */}
      {activeTab === 'profile' && (
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-100">Operator Profile</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Display Name" defaultValue="Alex M." />
            <Input label="Role" defaultValue="Site Reliability Lead" />
            <Input label="Email" defaultValue="alex.m@lily-ops.internal" />
            <Input label="Duty Shift" defaultValue="Primary On-Call (APAC/EMEA)" />
          </div>
        </Card>
      )}
    </div>
  )
}
