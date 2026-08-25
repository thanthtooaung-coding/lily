from dataclasses import dataclass

from app.models.action import Action
from app.utils.enums import ActionType


@dataclass
class ExecutionResult:
    success: bool
    message: str


class SimulatedActionExecutor:
    async def execute(self, action: Action, service: str) -> ExecutionResult:
        if action.action_type == ActionType.RESTART_SERVICE:
            return ExecutionResult(True, f"Simulated restart of {service} completed successfully.")
        if action.action_type == ActionType.RUN_HEALTH_CHECK:
            return ExecutionResult(True, f"Simulated health check for {service} completed successfully.")
        return ExecutionResult(True, f"Simulated {action.action_type.value.lower()} completed successfully.")