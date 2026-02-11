import { registerAs } from "@nestjs/config";
import { CacheConfigType } from "../types/cache.type.ts";
import { ConfigKeyEnum } from "../enums/config.enum.ts";

export const cacheRegister = registerAs(
  ConfigKeyEnum.CACHE,
  (): CacheConfigType => {
    return {
      redisUrl: process.env["REDIS_URL"] ?? "",
    };
  },
);
