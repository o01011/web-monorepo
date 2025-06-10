import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
	constructor(
		private redis: Redis,
		private readonly configService: ConfigService,
	) {}

	onModuleInit() {
		this.redis = new Redis({
			host: 'localhost',
			port: 6379,
			showFriendlyErrorStack: true,
		});
	}

	onModuleDestroy() {
		this.redis.quit();
	}

	async set(key: string, otp: string, ttl: number): Promise<void> {
		await this.redis.set(key, otp, 'EX', ttl);
	}

	async get(key: string): Promise<string | null> {
		return this.redis.get(key);
	}

	async delete(key: string): Promise<number> {
		return this.redis.del(key);
	}
}
