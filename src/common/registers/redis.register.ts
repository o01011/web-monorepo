import { registerAs } from '@nestjs/config';
import { IRedisConfig } from '@src/common/interfaces/redis-config.interface';
import { ConfigKeyEnum } from '@src/common/enums/config.enum';

export const redisRegister = registerAs(
  ConfigKeyEnum.REDIS,
  (): IRedisConfig => {
    return {
      redisUrl: process.env.REDIS_URL ?? '',
    };
  },
);
