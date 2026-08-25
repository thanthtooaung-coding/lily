import React from 'react'
import { RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { StatusDot } from '../common/StatusDot'
import { useSystemStatus } from '../../hooks/useSystemStatus'
import { formatRelativeTime } from '../../utils/formatDate'

export const SystemStatus: React.FC = () => {
  const { data: systemHealth, refetch, isFetching } = useSystemStatus()

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-300">
          System Status
        </CardTitle>
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          aria-label="Refresh system status"
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#1E293B] transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin text-blue-400' : ''}`} />
        </button>
      </CardHeader>

      <CardContent className="space-y-3 pt-1">
        <div className="space-y-2.5">
          {systemHealth?.services.map((srv) => (
            <div
              key={srv.key}
              className="flex items-center justify-between p-2.5 rounded-lg bg-[#0B1220] border border-[#24324A]/60 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <StatusDot
                  status={srv.status === 'OPERATIONAL' || srv.status === 'CONNECTED' ? 'operational' : 'degraded'}
                  size="sm"
                  pulse={false}
                />
                <span className="font-medium text-slate-200">{srv.name}</span>
              </div>

              <div className="flex items-center gap-3">
                {srv.latencyMs && (
                  <span className="text-[11px] text-slate-500 font-mono">
                    {srv.latencyMs}ms
                  </span>
                )}
                <span
                  className={`inline-flex items-center gap-1 font-semibold ${
                    srv.status === 'OPERATIONAL' || srv.status === 'CONNECTED'
                      ? 'text-emerald-400'
                      : 'text-amber-400'
                  }`}
                >
                  {srv.status === 'OPERATIONAL' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Healthy
                    </>
                  ) : srv.status === 'CONNECTED' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Connected
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5" />
                      Degraded
                    </>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-[#24324A]/40">
          <span>Last health check</span>
          <span className="font-mono text-slate-300">
            {formatRelativeTime(systemHealth?.lastChecked)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
