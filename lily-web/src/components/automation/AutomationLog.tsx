import React from 'react'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { useAutomationLogs } from '../../hooks/useAutomation'
import { formatRelativeTime } from '../../utils/formatDate'

export const AutomationLog: React.FC = () => {
  const { data: logs } = useAutomationLogs()

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold">Recent Automation Execution Logs</CardTitle>
      </CardHeader>

      <CardContent className="pt-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#24324A] bg-[#0F172A]/50 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Workflow Name</th>
                <th className="py-3 px-4">Target Incident</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Steps Completed</th>
                <th className="py-3 px-4">Execution Time</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#24324A]/60">
              {logs && logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#1E293B]/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-slate-200">
                      {log.workflowName}
                    </td>
                    <td className="py-3 px-4 text-slate-300 max-w-xs truncate">
                      {log.incidentTitle}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          log.status === 'SUCCESS'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : log.status === 'RUNNING'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/30 animate-pulse'
                            : 'bg-red-500/10 text-red-400 border-red-500/30'
                        }`}
                      >
                        {log.status === 'RUNNING' ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : log.status === 'SUCCESS' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <AlertCircle className="w-3 h-3 text-red-400" />
                        )}
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-mono">
                      {log.stepsCompleted} / {log.totalSteps} steps
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400">{log.duration}</td>
                    <td className="py-3 px-4 text-slate-400">
                      {formatRelativeTime(log.timestamp)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-400">
                    No execution logs available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
