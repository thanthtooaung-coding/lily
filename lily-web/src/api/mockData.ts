import type { Incident, AIAnalysis } from '../types/incident'
import type { Approval } from '../types/approval'
import type { IncidentAction } from '../types/action'
import type { DashboardSummary } from '../types/dashboard'
import type { AutomationLog, N8nAutomationStatus } from '../types/automation'
import type { SystemHealth } from '../types/system'

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'inc-9481',
    title: 'Payment API latency increased (>3500ms)',
    description: 'Payment gateway transactions in production are experiencing severe p99 latency spikes exceeding 3.5s. Webhook callbacks are failing with gateway timeouts.',
    service: 'payment-api',
    environment: 'production',
    severity: 'HIGH',
    status: 'AWAITING_APPROVAL',
    category: 'PERFORMANCE',
    source: 'Datadog Alert / APM Monitor',
    impact: 'Users may experience slow or failing checkout and payment processing.',
    urgency: 'HIGH',
    aiConfidence: 0.92,
    aiSummary: 'Lily AI detected connection pool saturation and downstream gateway rate limiting on payment-api v2.4.1.',
    recommendedAction: 'Restart payment-api service pods and flush stale connection pool.',
    requiresApproval: true,
    createdAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    aiAnalysis: {
      severity: 'HIGH',
      category: 'PERFORMANCE',
      confidence: 0.92,
      confidenceScore: 92,
      impact: 'Users may experience slow or failing checkout and payment processing.',
      urgency: 'HIGH',
      summary: 'Payment API latency has increased significantly (>3.5s) in production due to stale HTTP client connection pooling.',
      recommendedAction: 'Restart payment-api and monitor latency.',
      requiresApproval: true,
      reason: 'Consecutive 5-minute p99 breach detected across 4 worker pods in us-east-1.',
    },
    timeline: [
      {
        id: 't-1',
        title: 'Incident Created',
        description: 'APM monitor detected p99 latency spike (>3500ms)',
        timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
        actor: 'system',
      },
      {
        id: 't-2',
        title: 'Lily AI Analysis Started',
        description: 'Correlating logs, metrics, and recent deployments',
        timestamp: new Date(Date.now() - 7 * 60 * 1000).toISOString(),
        actor: 'ai',
      },
      {
        id: 't-3',
        title: 'AI Analysis Completed',
        description: 'Root cause identified with 92% confidence: stale connection pool',
        timestamp: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
        actor: 'ai',
      },
      {
        id: 't-4',
        title: 'Approval Requested',
        description: 'Automated remediation workflow requires operator confirmation',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        actor: 'n8n',
        isCurrent: true,
      },
    ],
  },
  {
    id: 'inc-9480',
    title: 'Database connection pool exhausted on primary replica',
    description: 'PostgreSQL primary connection pool reached 98% utilization with 42 blocked transactions waiting for locks.',
    service: 'database-cluster',
    environment: 'production',
    severity: 'CRITICAL',
    status: 'IN_PROGRESS',
    category: 'DATABASE',
    source: 'Postgres Exporter / Prometheus',
    impact: 'Read/write queries queuing across all core microservices.',
    urgency: 'CRITICAL',
    aiConfidence: 0.95,
    aiSummary: 'Unindexed query on user_sessions table causing sequential scans and long-running locks.',
    recommendedAction: 'Terminate idle blocked connections and scale read-replica pool.',
    requiresApproval: false,
    createdAt: new Date(Date.now() - 24 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    aiAnalysis: {
      severity: 'CRITICAL',
      category: 'DATABASE',
      confidence: 0.95,
      confidenceScore: 95,
      impact: 'Severe transaction latency across billing and user auth services.',
      urgency: 'CRITICAL',
      summary: 'Long-running lock queries blocking connection pool.',
      recommendedAction: 'Terminate idle blocked connections and scale read-replica pool.',
      requiresApproval: false,
      reason: '18 backend processes waiting on lock ID 0x4f81.',
    },
    timeline: [
      {
        id: 't-db-1',
        title: 'Incident Created',
        timestamp: new Date(Date.now() - 24 * 60 * 1000).toISOString(),
        actor: 'system',
      },
      {
        id: 't-db-2',
        title: 'AI Analysis Completed',
        description: 'Auto-approved low risk remediation rule matched',
        timestamp: new Date(Date.now() - 22 * 60 * 1000).toISOString(),
        actor: 'ai',
      },
      {
        id: 't-db-3',
        title: 'n8n Workflow Dispatched',
        description: 'Executing pg_terminate_backend on idle transactions',
        timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
        actor: 'n8n',
      },
      {
        id: 't-db-4',
        title: 'FastAPI Action Executing',
        description: 'Reclaiming connections and cycling pool workers',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        actor: 'fastapi',
        isCurrent: true,
      },
    ],
  },
  {
    id: 'inc-9479',
    title: 'Redis memory usage exceeded 90% threshold',
    description: 'Session cache Redis cluster memory footprint exceeded 14.8 GB of 16 GB max allocation.',
    service: 'redis-cache',
    environment: 'production',
    severity: 'MEDIUM',
    status: 'RESOLVED',
    category: 'INFRASTRUCTURE',
    source: 'AWS CloudWatch Alert',
    impact: 'Potential eviction of volatile JWT session keys.',
    urgency: 'MEDIUM',
    aiConfidence: 0.89,
    aiSummary: 'Expired analytics aggregation cache keys had missing TTL values.',
    recommendedAction: 'Flush volatile session-temp namespace and set default 24h TTL policy.',
    requiresApproval: true,
    createdAt: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    resolvedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    timeline: [
      {
        id: 't-r-1',
        title: 'Incident Created',
        timestamp: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
        actor: 'system',
      },
      {
        id: 't-r-2',
        title: 'AI Analysis Completed',
        timestamp: new Date(Date.now() - 108 * 60 * 1000).toISOString(),
        actor: 'ai',
      },
      {
        id: 't-r-3',
        title: 'Approved by Operator (Alex M.)',
        timestamp: new Date(Date.now() - 95 * 60 * 1000).toISOString(),
        actor: 'user',
      },
      {
        id: 't-r-4',
        title: 'n8n Workflow Finished',
        description: 'Memory dropped to 41% after eviction of 2.1M expired keys',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        actor: 'n8n',
      },
      {
        id: 't-r-5',
        title: 'Incident Resolved',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        actor: 'system',
      },
    ],
  },
  {
    id: 'inc-9478',
    title: 'Authentication service 502 Bad Gateway during surge',
    description: 'OAuth token validation endpoint returned intermittent HTTP 502 errors during peak traffic surge.',
    service: 'auth-service',
    environment: 'production',
    severity: 'HIGH',
    status: 'RESOLVED',
    category: 'AVAILABILITY',
    source: 'Kong Gateway Ingress',
    impact: 'Up to 3.2% of customer logins failed before retry.',
    urgency: 'HIGH',
    aiConfidence: 0.94,
    aiSummary: 'CPU throttling on auth-service containers due to bcrypt hashing saturation.',
    recommendedAction: 'Scale auth-service deployment from 4 to 12 replicas and enable horizontal pod autoscaling.',
    requiresApproval: true,
    createdAt: new Date(Date.now() - 210 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 140 * 60 * 1000).toISOString(),
    resolvedAt: new Date(Date.now() - 140 * 60 * 1000).toISOString(),
  },
  {
    id: 'inc-9477',
    title: 'Order processing worker queue delayed (>10k jobs backlog)',
    description: 'Asynchronous event queue for order fulfillment experienced worker processing lag.',
    service: 'order-processor',
    environment: 'production',
    severity: 'MEDIUM',
    status: 'RESOLVED',
    category: 'APPLICATION',
    source: 'RabbitMQ / Celery Monitor',
    impact: 'Confirmation emails and warehouse dispatches delayed by 12 minutes.',
    urgency: 'MEDIUM',
    aiConfidence: 0.91,
    aiSummary: 'Third-party shipping rate calculator endpoint latency causing Celery worker thread exhaustion.',
    recommendedAction: 'Enable circuit breaker for rate calculator and double Celery concurrency pool.',
    requiresApproval: false,
    createdAt: new Date(Date.now() - 360 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 280 * 60 * 1000).toISOString(),
    resolvedAt: new Date(Date.now() - 280 * 60 * 1000).toISOString(),
  },
]

export const INITIAL_APPROVALS: Approval[] = [
  {
    id: 'appr-301',
    incidentId: 'inc-9481',
    incidentTitle: 'Payment API latency increased (>3500ms)',
    action: 'Restart payment-api and cycle connection pools',
    actionType: 'RESTART_SERVICE',
    reason: 'High p99 latency (>3.5s) detected across payment pods for 5 consecutive minutes.',
    riskLevel: 'MEDIUM',
    status: 'PENDING',
    severity: 'HIGH',
    service: 'payment-api',
    requestedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: 'appr-300',
    incidentId: 'inc-9479',
    incidentTitle: 'Redis memory usage exceeded 90% threshold',
    action: 'Flush volatile session-temp keys and enforce TTL policy',
    actionType: 'CLEAR_CACHE',
    reason: 'Memory footprint exceeded safe working memory limit (14.8 GB).',
    riskLevel: 'LOW',
    status: 'APPROVED',
    severity: 'MEDIUM',
    service: 'redis-cache',
    requestedAt: new Date(Date.now() - 95 * 60 * 1000).toISOString(),
    respondedAt: new Date(Date.now() - 93 * 60 * 1000).toISOString(),
    respondedBy: 'Alex M. (Site Reliability Lead)',
    comment: 'Approved remediation workflow. Temporary session eviction is safe.',
    createdAt: new Date(Date.now() - 95 * 60 * 1000).toISOString(),
  },
]

export const INITIAL_ACTIONS: IncidentAction[] = [
  {
    id: 'act-501',
    incidentId: 'inc-9480',
    incidentTitle: 'Database connection pool exhausted on primary replica',
    actionType: 'KILL_IDLE_CONNECTIONS',
    description: 'pg_terminate_backend for idle-in-transaction connections > 60s',
    status: 'RUNNING',
    triggeredBy: 'n8n Auto-Remediation Workflow #12',
    requestedBy: 'Lily AI Auto-Rule',
    startedAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: 'act-500',
    incidentId: 'inc-9479',
    incidentTitle: 'Redis memory usage exceeded 90% threshold',
    actionType: 'CLEAR_CACHE',
    description: 'Evicted volatile session namespace and tuned maxmemory-policy',
    status: 'SUCCESS',
    triggeredBy: 'Human Approval (Alex M.)',
    approvedBy: 'Alex M.',
    startedAt: new Date(Date.now() - 93 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    result: 'Reclaimed 6.2 GB RAM in redis-primary cluster. Utilization down to 41%.',
    createdAt: new Date(Date.now() - 95 * 60 * 1000).toISOString(),
  },
  {
    id: 'act-499',
    incidentId: 'inc-9478',
    incidentTitle: 'Authentication service 502 Bad Gateway during surge',
    actionType: 'SCALE_SERVICE',
    description: 'Scaled auth-service Kubernetes deployment replicas to 12',
    status: 'SUCCESS',
    triggeredBy: 'Lily Orchestrator',
    approvedBy: 'Operator on-call',
    startedAt: new Date(Date.now() - 200 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 140 * 60 * 1000).toISOString(),
    result: 'HPA scaled auth-service successfully. Error rate dropped to 0.00%.',
    createdAt: new Date(Date.now() - 205 * 60 * 1000).toISOString(),
  },
]

export const INITIAL_AUTOMATION_LOGS: AutomationLog[] = [
  {
    id: 'log-101',
    incidentId: 'inc-9481',
    incidentTitle: 'Payment API latency increased (>3500ms)',
    workflowName: 'Incident Triage & Slack/Telegram Alert',
    status: 'SUCCESS',
    stepsCompleted: 4,
    totalSteps: 4,
    duration: '1.4s',
    timestamp: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
  },
  {
    id: 'log-102',
    incidentId: 'inc-9480',
    incidentTitle: 'Database connection pool exhausted on primary replica',
    workflowName: 'PostgreSQL Auto-Remediation & Escalation',
    status: 'RUNNING',
    stepsCompleted: 3,
    totalSteps: 5,
    duration: '42s',
    timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
  },
  {
    id: 'log-103',
    incidentId: 'inc-9479',
    incidentTitle: 'Redis memory usage exceeded 90% threshold',
    workflowName: 'Cache Eviction & Telemetry Sync',
    status: 'SUCCESS',
    stepsCompleted: 5,
    totalSteps: 5,
    duration: '3.8s',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
]

export const INITIAL_N8N_STATUS: N8nAutomationStatus = {
  service: 'n8n Workflow Engine',
  connected: true,
  webhookStatus: 'Connected & Healthy (200 OK)',
  lastExecution: '12 seconds ago',
  successfulExecutions: 124,
  failedExecutions: 3,
  uptime: '99.98%',
  activeWorkflows: 8,
}

export const INITIAL_SYSTEM_HEALTH: SystemHealth = {
  allOperational: true,
  lastChecked: new Date().toISOString(),
  services: [
    { name: 'Lily API', key: 'lily_api', status: 'OPERATIONAL', latencyMs: 14, lastChecked: 'Just now', message: 'FastAPI service healthy' },
    { name: 'PostgreSQL', key: 'postgres', status: 'OPERATIONAL', latencyMs: 8, lastChecked: 'Just now', message: 'Database connection pool optimal' },
    { name: 'AI Engine', key: 'ai_engine', status: 'OPERATIONAL', latencyMs: 142, lastChecked: 'Just now', message: 'LLM reasoning model active (p95 420ms)' },
    { name: 'n8n Automation', key: 'n8n', status: 'CONNECTED', latencyMs: 38, lastChecked: 'Just now', message: 'Webhook triggers synchronized' },
    { name: 'Telegram Alerts', key: 'telegram', status: 'CONNECTED', latencyMs: 65, lastChecked: 'Just now', message: 'Bot gateway authenticated' },
  ],
}

// In-Memory Reactive Mock Store
class MockStore {
  incidents: Incident[] = [...INITIAL_INCIDENTS]
  approvals: Approval[] = [...INITIAL_APPROVALS]
  actions: IncidentAction[] = [...INITIAL_ACTIONS]
  automationLogs: AutomationLog[] = [...INITIAL_AUTOMATION_LOGS]
  n8nStatus: N8nAutomationStatus = { ...INITIAL_N8N_STATUS }
  systemHealth: SystemHealth = { ...INITIAL_SYSTEM_HEALTH }

  getDashboardSummary(): DashboardSummary {
    const openCount = this.incidents.filter(i => ['OPEN', 'ANALYZING', 'AWAITING_APPROVAL', 'APPROVED', 'IN_PROGRESS'].includes(i.status)).length
    const criticalCount = this.incidents.filter(i => i.severity === 'CRITICAL' && i.status !== 'RESOLVED' && i.status !== 'CLOSED').length
    const resolvedTodayCount = this.incidents.filter(i => i.status === 'RESOLVED' || i.status === 'CLOSED').length + 45 // baseline demo count

    return {
      metrics: {
        openIncidents: openCount,
        openIncidentsTrend: '↑ 8% this week',
        criticalIncidents: criticalCount,
        criticalIncidentsStatus: criticalCount > 0 ? 'Needs attention' : 'All clear',
        resolvedToday: resolvedTodayCount,
        resolvedTrend: '↑ 14% vs yesterday',
        avgResolutionTime: '18m',
        avgResolutionTrend: '↓ 12% faster',
      },
      activity: [
        { time: '00:00', created: 2, resolved: 3 },
        { time: '04:00', created: 1, resolved: 2 },
        { time: '08:00', created: 4, resolved: 5 },
        { time: '12:00', created: 8, resolved: 7 },
        { time: '16:00', created: 6, resolved: 8 },
        { time: '20:00', created: 3, resolved: 4 },
        { time: 'Now', created: openCount, resolved: resolvedTodayCount % 10 },
      ],
      recentIncidents: [...this.incidents].slice(0, 5),
      aiOverview: {
        analyzedToday: 12 + this.incidents.length - INITIAL_INCIDENTS.length,
        avgConfidence: 91.4,
        topCategory: 'PERFORMANCE',
        mostAffectedService: 'payment-api',
        actionsAutomated: 18,
        accuracyRate: 98.2,
      },
    }
  }

  createIncident(data: { title: string; description: string; service: string; environment: string; severity?: string }): Incident {
    const newId = `inc-${Math.floor(1000 + Math.random() * 9000)}`
    const now = new Date().toISOString()

    const newIncident: Incident = {
      id: newId,
      title: data.title,
      description: data.description,
      service: data.service,
      environment: data.environment || 'production',
      severity: (data.severity as any) || 'HIGH',
      status: 'ANALYZING',
      category: 'PERFORMANCE',
      source: 'Operator Console / API Ingestion',
      createdAt: now,
      updatedAt: now,
      timeline: [
        {
          id: `t-${Date.now()}-1`,
          title: 'Incident Created',
          description: `Created in ${data.environment} for service ${data.service}`,
          timestamp: now,
          actor: 'user',
        },
        {
          id: `t-${Date.now()}-2`,
          title: 'AI Analysis Initiated',
          description: 'Lily AI examining trace logs, system metrics, and telemetry...',
          timestamp: now,
          actor: 'ai',
          isCurrent: true,
        },
      ],
    }

    this.incidents = [newIncident, ...this.incidents]

    // Simulate AI Analysis completion after 1.5 seconds
    setTimeout(() => {
      this.completeAIAnalysis(newId)
    }, 1500)

    return newIncident
  }

  completeAIAnalysis(incidentId: string): Incident | null {
    const incident = this.incidents.find(i => i.id === incidentId)
    if (!incident) return null

    const now = new Date().toISOString()
    const analysis: AIAnalysis = {
      severity: incident.severity || 'HIGH',
      category: incident.category || 'PERFORMANCE',
      confidence: 0.92,
      confidenceScore: 92,
      impact: `Critical latency and degradation detected on ${incident.service}.`,
      urgency: incident.severity === 'CRITICAL' ? 'CRITICAL' : 'HIGH',
      summary: `Lily AI analyzed system traces for ${incident.service}: Correlated high memory pressure and connection leak.`,
      recommendedAction: `Restart ${incident.service} and cycle connection pool.`,
      requiresApproval: true,
      reason: 'Automated remediation requires operator confirmation before deployment cycling.',
    }

    incident.status = 'AWAITING_APPROVAL'
    incident.aiConfidence = 0.92
    incident.aiSummary = analysis.summary
    incident.recommendedAction = analysis.recommendedAction
    incident.requiresApproval = true
    incident.aiAnalysis = analysis
    incident.updatedAt = now

    incident.timeline = [
      ...(incident.timeline || []),
      {
        id: `t-${Date.now()}-3`,
        title: 'Lily AI Analysis Completed',
        description: `Confidence: 92% — Recommended action: Restart ${incident.service}`,
        timestamp: now,
        actor: 'ai',
      },
      {
        id: `t-${Date.now()}-4`,
        title: 'Approval Requested',
        description: 'Waiting for human operator confirmation to dispatch remediation',
        timestamp: now,
        actor: 'n8n',
        isCurrent: true,
      },
    ]

    // Create approval item
    const approvalId = `appr-${Math.floor(100 + Math.random() * 900)}`
    const newApproval: Approval = {
      id: approvalId,
      incidentId: incident.id,
      incidentTitle: incident.title,
      action: `Restart ${incident.service}`,
      actionType: 'RESTART_SERVICE',
      reason: `Automated remediation recommended by Lily AI with 92% confidence score.`,
      riskLevel: 'MEDIUM',
      status: 'PENDING',
      severity: incident.severity,
      service: incident.service,
      requestedAt: now,
      createdAt: now,
    }

    this.approvals = [newApproval, ...this.approvals.filter(a => a.incidentId !== incident.id)]
    return incident
  }

  approveAction(approvalIdOrActionId: string, decision?: { comment?: string; responded_by?: string }): { success: boolean; incident?: Incident } {
    const approval = this.approvals.find(a => a.id === approvalIdOrActionId || a.incidentId === approvalIdOrActionId)
    if (!approval) return { success: false }

    const now = new Date().toISOString()
    approval.status = 'APPROVED'
    approval.respondedAt = now
    approval.respondedBy = decision?.responded_by || 'DevOps On-Call'
    approval.comment = decision?.comment || 'Approved automated remediation workflow.'

    const incident = this.incidents.find(i => i.id === approval.incidentId)
    if (incident) {
      incident.status = 'IN_PROGRESS'
      incident.updatedAt = now
      incident.timeline = [
        ...(incident.timeline || []).map(t => ({ ...t, isCurrent: false })),
        {
          id: `t-${Date.now()}-5`,
          title: `Action Approved by ${approval.respondedBy}`,
          description: approval.comment || undefined,
          timestamp: now,
          actor: 'user',
        },
        {
          id: `t-${Date.now()}-6`,
          title: 'n8n Automation Workflow Dispatched',
          description: 'Orchestrating webhook triggers, Telegram notification, and FastAPI execution...',
          timestamp: now,
          actor: 'n8n',
          isCurrent: true,
        },
      ]

      // Add to running actions
      const newAction: IncidentAction = {
        id: `act-${Math.floor(500 + Math.random() * 500)}`,
        incidentId: incident.id,
        incidentTitle: incident.title,
        actionType: approval.actionType || 'RESTART_SERVICE',
        description: approval.action,
        status: 'RUNNING',
        triggeredBy: `Operator Approval (${approval.respondedBy})`,
        approvedBy: approval.respondedBy,
        startedAt: now,
        createdAt: now,
      }
      this.actions = [newAction, ...this.actions]

      // Simulate full automated resolution after 2.5 seconds
      setTimeout(() => {
        this.resolveRemediation(incident.id, newAction.id)
      }, 2500)
    }

    return { success: true, incident }
  }

  rejectAction(approvalIdOrActionId: string, decision?: { comment?: string; responded_by?: string }): { success: boolean } {
    const approval = this.approvals.find(a => a.id === approvalIdOrActionId || a.incidentId === approvalIdOrActionId)
    if (!approval) return { success: false }

    const now = new Date().toISOString()
    approval.status = 'REJECTED'
    approval.respondedAt = now
    approval.respondedBy = decision?.responded_by || 'DevOps On-Call'
    approval.comment = decision?.comment || 'Rejected by operator.'

    const incident = this.incidents.find(i => i.id === approval.incidentId)
    if (incident) {
      incident.status = 'OPEN'
      incident.updatedAt = now
      incident.timeline = [
        ...(incident.timeline || []).map(t => ({ ...t, isCurrent: false })),
        {
          id: `t-${Date.now()}-rej`,
          title: 'Action Rejected',
          description: `Operator rejected action: ${approval.comment}`,
          timestamp: now,
          actor: 'user',
        },
      ]
    }
    return { success: true }
  }

  resolveRemediation(incidentId: string, actionId?: string) {
    const now = new Date().toISOString()
    const incident = this.incidents.find(i => i.id === incidentId)
    if (incident) {
      incident.status = 'RESOLVED'
      incident.resolvedAt = now
      incident.updatedAt = now
      incident.timeline = [
        ...(incident.timeline || []).map(t => ({ ...t, isCurrent: false })),
        {
          id: `t-${Date.now()}-7`,
          title: 'Telegram Alert Sent',
          description: 'Notified on-call engineering channel #incidents-prod',
          timestamp: now,
          actor: 'n8n',
        },
        {
          id: `t-${Date.now()}-8`,
          title: 'FastAPI Action Completed Successfully',
          description: `Service ${incident.service} restarted and latency normalized (<120ms)`,
          timestamp: now,
          actor: 'fastapi',
        },
        {
          id: `t-${Date.now()}-9`,
          title: 'Incident Resolved ✓',
          description: 'Lily confirmed system health and closed alert lifecycle',
          timestamp: now,
          actor: 'system',
          isCurrent: true,
        },
      ]
    }

    if (actionId) {
      const action = this.actions.find(a => a.id === actionId)
      if (action) {
        action.status = 'SUCCESS'
        action.completedAt = now
        action.result = `Remediation executed successfully. Service returned to healthy state.`
      }
    }

    this.n8nStatus.successfulExecutions += 1
    this.n8nStatus.lastExecution = 'Just now'
  }
}

export const mockStore = new MockStore()
