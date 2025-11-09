import { ConfigKeyEnum } from '@app/common/enums/config.enum';
import { registerAs } from '@nestjs/config';
import { IRedis } from '../interfaces/redis.interface';

export const redisConfig = registerAs(ConfigKeyEnum.Redis, (): IRedis => {
	return {
		redisUrl: process.env.REDIS_URL,
	};
});
