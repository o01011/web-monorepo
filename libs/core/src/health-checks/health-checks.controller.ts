import { Controller, Get } from '@nestjs/common';
import { HealthCheckResult } from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';
import { HealthChecksService } from './health-checks.service';

@ApiTags('Health Check')
@Controller('health-checks')
export class HealthChecksController {
	constructor(private readonly healthChecksService: HealthChecksService) {}

	@Get()
	healthCheck(): Promise<HealthCheckResult> {
		return this.healthChecksService.check();
	}
}
