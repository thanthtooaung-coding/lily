import React from 'react'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import {
  BarChart3,
  Target,
  Sparkles,
} from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { MetricCard } from '../components/dashboard/MetricCard'

const SEVERITY_DATA = [
  { name: 'Critical', value: 4, color: '#EF4444' },
  { name: 'High', value: 12, color: '#F97316' },
  { name: 'Medium', value: 24, color: '#F59E0B' },
  { name: 'Low', value: 18, color: '#3B82F6' },
]

const SERVICE_DATA = [
  { service: 'payment-api', incidents: 14, automated: 12 },
  { service: 'database-cluster', incidents: 11, automated: 9 },
  { service: 'redis-cache', incidents: 8, automated: 8 },
  { service: 'auth-service', incidents: 16, automated: 15 },
  { service: 'order-processor', incidents: 9, automated: 8 },
]

const RESOLUTION_TREND_DATA = [
  { month: 'Jan', manualMin: 48, lilyMin: 18 },
  { month: 'Feb', manualMin: 52, lilyMin: 16 },
  { month: 'Mar', manualMin: 45, lilyMin: 15 },
  { month: 'Apr', manualMin: 42, lilyMin: 14 },
  { month: 'May', manualMin: 55, lilyMin: 12 },
]

export const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Platform reliability metrics, autonomous resolution efficiency, and incident trends."
      />

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Total Incidents Tracked"
          value="58"
          trend="↑ 12% MoM"
          trendType="neutral"
          icon={<BarChart3 className="w-4 h-4 text-blue-400" />}
        />

        <MetricCard
          title="AI Diagnostic Accuracy"
          value="98.2%"
          trend="↑ 2.4%"
          trendType="positive"
          icon={<Target className="w-4 h-4 text-emerald-400" />}
          subtitle="Validated against root causes"
        />

        <MetricCard
          title="Automation Success Rate"
          value="97.6%"
          trend="124 / 127 runs"
          trendType="positive"
          icon={<Sparkles className="w-4 h-4 text-indigo-400" />}
          subtitle="Autonomous n8n workflows"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incidents by Service */}
        <Card className="p-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold">Incidents by Service</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SERVICE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#24324A" vertical={false} />
                  <XAxis dataKey="service" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#24324A',
                      borderRadius: '0.75rem',
                      color: '#F8FAFC',
                      fontSize: '12px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="incidents" name="Total Incidents" fill="#EF4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="automated" name="Auto-Remediated" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Severity Distribution */}
        <Card className="p-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold">Incidents by Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SEVERITY_DATA}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={45}
                    paddingAngle={4}
                    label={({ name, percent }: { name?: string; percent?: number }) =>
                      `${name || ''} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {SEVERITY_DATA.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#24324A',
                      borderRadius: '0.75rem',
                      color: '#F8FAFC',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Resolution Time Reduction Line Chart */}
        <Card className="p-2 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold">
              Mean Time to Resolution (MTTR) Reduction (Minutes)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={RESOLUTION_TREND_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#24324A" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} unit="m" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#24324A',
                      borderRadius: '0.75rem',
                      color: '#F8FAFC',
                      fontSize: '12px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="manualMin"
                    name="Manual Triage MTTR (m)"
                    stroke="#EF4444"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                  />
                  <Line
                    type="monotone"
                    dataKey="lilyMin"
                    name="Lily Autonomous MTTR (m)"
                    stroke="#3B82F6"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
