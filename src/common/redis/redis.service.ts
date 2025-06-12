import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
	constructor(@InjectRedis() private readonly redis: Redis) {}

	onModuleDestroy() {
		this.redis.quit();
	}

	async set<T extends object>(key: string, val: T, ttl?: number): Promise<void> {
		const stringVal = JSON.stringify(val);

		if (ttl) {
			await this.redis.set(key, stringVal, 'EX', ttl);
		} else {
			await this.redis.set(key, stringVal);
		}
	}

	async get<T extends object>(key: string): Promise<T | null> {
		const val = await this.redis.get(key);

		return JSON.parse(val);
	}

	async delete(key: string): Promise<void> {
		await this.redis.del(key);
	}
}
