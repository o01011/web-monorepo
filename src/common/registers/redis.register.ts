import { registerAs } from '@nestjs/config';
import { IRedisConfig } from '../../common/interfaces/redis-config.interface';
import { ConfigKeyEnum } from '../../common/enums/config.enum';

export const redisRegister = registerAs(
  ConfigKeyEnum.Redis,
  (): IRedisConfig => {
    return {
      redisUrl: process.env.REDIS_URL ?? '',
    };
  },
);
