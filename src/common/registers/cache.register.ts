import { registerAs } from "@nestjs/config";
import { CacheType } from "../types/cache.type.js";
import { ConfigKeyEnum } from "../enums/config.enum.js";

export const cacheRegister = registerAs(ConfigKeyEnum.CACHE, (): CacheType => {
  return {
    redisUrl: process.env["REDIS_URL"] || "",
  };
});
