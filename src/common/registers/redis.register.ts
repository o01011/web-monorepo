import { registerAs } from "@nestjs/config";
import { IRedisConfig } from "../interfaces/redis-config.interface";
import { ConfigKeyEnum } from "../enums/config.enum";

export const redisRegister = registerAs(
  ConfigKeyEnum.REDIS,
  (): IRedisConfig => {
    return {
      redisUrl: process.env["REDIS_URL"] ?? "",
    };
  },
);
