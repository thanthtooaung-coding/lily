from dataclasses import dataclass

from app.models.incident import Incident
from app.utils.enums import Category, Severity


@dataclass
class Analysis:
    severity: Severity
    category: Category
    impact: str
    urgency: str
    recommended_action: str
    requires_approval: bool
    reason: str


class AIService:
    async def analyze(self, incident: Incident) -> Analysis:
        text = f"{incident.title} {incident.description}".lower()
        performance = any(word in text for word in ("latency", "slow", "response time", "performance"))
        critical = any(word in text for word in ("outage", "down", "critical"))
        severity = Severity.CRITICAL if critical else Severity.HIGH if performance else Severity.MEDIUM
        return Analysis(
            severity=severity,
            category=Category.PERFORMANCE if performance else Category.APPLICATION,
            impact="Users may experience degraded service." if performance else "The application may be affected.",
            urgency="CRITICAL" if critical else "HIGH" if performance else "MEDIUM",
            recommended_action=f"Run a health check for {incident.service} and monitor the result.",
            requires_approval=severity in (Severity.HIGH, Severity.CRITICAL),
            reason="Production-impacting remediation requires operator approval." if severity in (Severity.HIGH, Severity.CRITICAL) else "No privileged remediation is suggested.",
        )