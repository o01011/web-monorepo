import { PrismaService } from '@core/prisma/prisma.service';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import {
	HealthCheck,
	HealthCheckResult,
	HealthCheckService,
	HealthIndicatorResult,
	PrismaHealthIndicator,
	HealthIndicatorService,
} from '@nestjs/terminus';
import Redis from 'ioredis';

@Injectable()
export class HealthChecksService {
	constructor(
		@InjectRedis() private readonly redis: Redis,
		private readonly healthCheckService: HealthCheckService,
		private readonly prismaHealthIndicator: PrismaHealthIndicator,
		private readonly prismaService: PrismaService,
		private readonly healthIndicatorService: HealthIndicatorService,
	) {}

	@HealthCheck()
	check(): Promise<HealthCheckResult> {
		return this.healthCheckService.check([
			(): Promise<HealthIndicatorResult> =>
				this.prismaHealthIndicator.pingCheck('postgres', this.prismaService),
			(): Promise<HealthIndicatorResult> => this.pingCheck('redis'),
		]);
	}

	async pingCheck<const TKey extends string>(key: TKey): Promise<HealthIndicatorResult> {
		const indicator = this.healthIndicatorService.check(key);

		try {
			await this.redis.ping();
			return indicator.up();
		} catch (e) {
			return indicator.down({ message: e.message });
		}
	}
}
