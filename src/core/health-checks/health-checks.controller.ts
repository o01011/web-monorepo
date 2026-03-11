import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HealthCheckResult } from "@nestjs/terminus";
import { HealthChecksService } from "./health-checks.service.js";

@ApiTags("Health Checks")
@Controller("health-checks")
export class HealthChecksController {
	constructor(private readonly healthChecksService: HealthChecksService) {}

	@Get()
	healthCheck(): Promise<HealthCheckResult> {
		return this.healthChecksService.check();
	}
}
