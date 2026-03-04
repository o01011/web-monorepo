import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../enums/config.enum.ts";
import { RateLimitType } from "../types/rate-limiting.type.ts";

export const rateLimitRegister = registerAs(
  ConfigKeyEnum.RATE_LIMIT,
  (): RateLimitType => {
    return {
      ttl: Number(process.env["THROTTLE_TTL"]) || 0,
      limit: Number(process.env["THROTTLE_LIMIT"]) || 0,
    };
  },
);
