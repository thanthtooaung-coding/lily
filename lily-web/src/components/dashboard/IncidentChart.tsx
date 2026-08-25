import React, { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card'
import type { IncidentActivityPoint } from '../../types/dashboard'

interface IncidentChartProps {
  data?: IncidentActivityPoint[]
}

const DATA_7D: IncidentActivityPoint[] = [
  { time: 'Mon', created: 14, resolved: 18 },
  { time: 'Tue', created: 22, resolved: 20 },
  { time: 'Wed', created: 18, resolved: 24 },
  { time: 'Thu', created: 30, resolved: 28 },
  { time: 'Fri', created: 25, resolved: 31 },
  { time: 'Sat', created: 10, resolved: 12 },
  { time: 'Sun', created: 8, resolved: 11 },
]

const DATA_30D: IncidentActivityPoint[] = [
  { time: 'Week 1', created: 82, resolved: 90 },
  { time: 'Week 2', created: 105, resolved: 110 },
  { time: 'Week 3', created: 74, resolved: 85 },
  { time: 'Week 4', created: 68, resolved: 79 },
]

export const IncidentChart: React.FC<IncidentChartProps> = ({ data }) => {
  const [timeRange, setTimeRange] = useState<'24H' | '7D' | '30D'>('24H')

  const chartData =
    timeRange === '24H'
      ? data && data.length > 0
        ? data
        : [
            { time: '00:00', created: 2, resolved: 3 },
            { time: '04:00', created: 1, resolved: 2 },
            { time: '08:00', created: 5, resolved: 4 },
            { time: '12:00', created: 8, resolved: 9 },
            { time: '16:00', created: 6, resolved: 7 },
            { time: '20:00', created: 3, resolved: 4 },
          ]
      : timeRange === '7D'
      ? DATA_7D
      : DATA_30D

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle>Incident Activity</CardTitle>
          <CardDescription>
            Telemetry correlation for created vs resolved production incidents
          </CardDescription>
        </div>

        {/* Time range selector */}
        <div className="flex items-center bg-[#0B1220] border border-[#24324A] rounded-lg p-1 text-xs">
          {(['24H', '7D', '30D'] as const).map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setTimeRange(range)}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#24324A" vertical={false} />
              <XAxis
                dataKey="time"
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#24324A',
                  borderRadius: '0.75rem',
                  color: '#F8FAFC',
                  fontSize: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                }}
                labelStyle={{ fontWeight: 'bold', color: '#94A3B8' }}
              />

              <Area
                type="monotone"
                dataKey="created"
                name="Incidents Created"
                stroke="#EF4444"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCreated)"
              />
              <Area
                type="monotone"
                dataKey="resolved"
                name="Incidents Resolved"
                stroke="#3B82F6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorResolved)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span>Incidents Created</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Incidents Resolved</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
