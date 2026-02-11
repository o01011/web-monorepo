import { registerAs } from "@nestjs/config";
import { CacheType } from "../types/cache.type.ts";
import { ConfigKeyEnum } from "../enums/config.enum.ts";

export const cacheRegister = registerAs(ConfigKeyEnum.CACHE, (): CacheType => {
  return {
    redisUrl: process.env["REDIS_URL"] ?? "",
  };
});
