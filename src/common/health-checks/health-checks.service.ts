import { PrismaService } from '@common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
	HealthCheck,
	HealthCheckResult,
	HealthCheckService,
	HealthIndicatorResult,
	// MongooseHealthIndicator,
	PrismaHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class HealthChecksService {
	constructor(
		private readonly healthCheckService: HealthCheckService,
		private readonly prismaHealthIndicator: PrismaHealthIndicator,
		// private readonly mongooseHealthIndicator: MongooseHealthIndicator,
		private readonly prismaService: PrismaService,
	) {}

	@HealthCheck()
	check(): Promise<HealthCheckResult> {
		return this.healthCheckService.check([
			(): Promise<HealthIndicatorResult> =>
				this.prismaHealthIndicator.pingCheck('database', this.prismaService),
			(): Promise<HealthCheckResult> => this.redis.pingCheck('redis'),
			// (): Promise<HealthCheckResult> => this.mongooseHealthIndicator.pingCheck('mongodb'),
		]);
	}
}
