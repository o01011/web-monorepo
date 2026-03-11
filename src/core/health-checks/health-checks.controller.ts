import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { HealthCheckResult } from "@nestjs/terminus";
import type { HealthChecksService } from "./health-checks.service.js";

@ApiTags("Health Checks")
@Controller("health-checks")
export class HealthChecksController {
	constructor(private readonly healthChecksService: HealthChecksService) {}

	@Get()
	healthCheck(): Promise<HealthCheckResult> {
		return this.healthChecksService.check();
	}
}
