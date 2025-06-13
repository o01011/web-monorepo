import { Controller, Get } from '@nestjs/common';
import { HealthChecksService } from './health-checks.service';
import { HealthCheckResult } from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller('health-checks')
export class HealthChecksController {
	constructor(private readonly healthChecksService: HealthChecksService) {}

	@Get()
	healthCheck(): Promise<HealthCheckResult> {
		return this.healthChecksService.check();
	}
}
