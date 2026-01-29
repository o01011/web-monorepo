import { registerAs } from "@nestjs/config";
import { IRedisConfig } from "../interfaces/redis-config.interface.js";
import { ConfigKeyEnum } from "../enums/config.enum.js";

export const redisRegister = registerAs(
  ConfigKeyEnum.REDIS,
  (): IRedisConfig => {
    return {
      redisUrl: process.env["REDIS_URL"] ?? "",
    };
  },
);
