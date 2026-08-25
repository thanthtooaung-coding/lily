import React from 'react'
import { Sparkles, TrendingUp, Zap, Target } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import type { AIOverviewData } from '../../types/dashboard'

interface AIOverviewProps {
  data?: AIOverviewData
}

export const AIOverview: React.FC<AIOverviewProps> = ({ data }) => {
  return (
    <Card className="relative overflow-hidden border-blue-500/30 bg-gradient-to-br from-[#151F32] to-[#101B2E]">
      {/* Decorative gradient blur */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <CardTitle className="text-sm font-semibold text-slate-100">
            Lily AI Engine Overview
          </CardTitle>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
          Autonomous Triage
        </span>
      </CardHeader>

      <CardContent className="space-y-4 pt-1">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-[#0B1220]/80 border border-[#24324A]/70">
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              Analyzed Today
            </span>
            <p className="text-xl font-bold text-slate-100 mt-1">
              {data?.analyzedToday || 12}
            </p>
            <span className="text-[10px] text-emerald-400">100% automated triage</span>
          </div>

          <div className="p-3 rounded-xl bg-[#0B1220]/80 border border-[#24324A]/70">
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              Avg Confidence
            </span>
            <p className="text-xl font-bold text-slate-100 mt-1">
              {data?.avgConfidence ? `${data.avgConfidence}%` : '91.4%'}
            </p>
            <span className="text-[10px] text-slate-400">High diagnostic accuracy</span>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#0B1220]/40 border border-[#24324A]/40">
            <span className="text-slate-400">Top Root Cause</span>
            <span className="font-semibold text-blue-300">
              {data?.topCategory || 'PERFORMANCE'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#0B1220]/40 border border-[#24324A]/40">
            <span className="text-slate-400">Most Impacted Service</span>
            <span className="font-mono text-slate-200">
              {data?.mostAffectedService || 'payment-api'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#0B1220]/40 border border-[#24324A]/40">
            <span className="text-slate-400">Remediation Success</span>
            <span className="font-semibold text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {data?.accuracyRate ? `${data.accuracyRate}%` : '98.2%'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
