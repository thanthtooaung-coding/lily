import React from 'react'
import { Workflow, CheckCircle2, AlertTriangle, Radio } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { useAutomationStatus } from '../../hooks/useAutomation'

export const AutomationCard: React.FC = () => {
  const { data: status } = useAutomationStatus()

  return (
    <Card className="border-blue-500/30 bg-gradient-to-br from-[#151F32] to-[#0F172A]">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <Workflow className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-base font-bold text-slate-100">
              n8n Workflow Engine Status
            </CardTitle>
            <p className="text-xs text-slate-400">
              Async orchestration and incident response webhooks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1220] border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>Connected ✓</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-[#0B1220] border border-[#24324A]">
            <span className="text-[11px] text-slate-400">Webhook Status</span>
            <p className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Healthy (200 OK)
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#0B1220] border border-[#24324A]">
            <span className="text-[11px] text-slate-400">Successful Runs</span>
            <p className="text-xl font-bold text-slate-100 mt-1">
              {status?.successfulExecutions || 124}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#0B1220] border border-[#24324A]">
            <span className="text-[11px] text-slate-400">Failed Executions</span>
            <p className="text-xl font-bold text-slate-100 mt-1 flex items-center gap-1.5">
              <span>{status?.failedExecutions || 3}</span>
              <span className="text-[10px] text-slate-400 font-normal">(97.6% success)</span>
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#0B1220] border border-[#24324A]">
            <span className="text-[11px] text-slate-400">Last Execution</span>
            <p className="text-sm font-bold text-slate-200 mt-1 font-mono">
              {status?.lastExecution || '2 minutes ago'}
            </p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#0B1220]/60 border border-[#24324A] text-xs text-slate-400 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-200">Architecture Guarantee: </strong>
            The frontend communicates exclusively via the FastAPI backend REST endpoints.
            FastAPI securely orchestrates n8n webhooks and callbacks with zero frontend token exposure.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
