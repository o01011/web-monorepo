import { registerAs } from '@nestjs/config';
import { IRedisConfig } from '../interfaces/redis.interface';
import { ConfigKeyEnum } from '@libs/common/enums';

export const redisConfig = registerAs(ConfigKeyEnum.Redis, (): IRedisConfig => {
	return {
		redisUrl: process.env.REDIS_URL,
	};
});
