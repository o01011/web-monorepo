import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../enums/config.enum.js";
import type { RateLimitType } from "../types/rate-limiting.type.js";

export const rateLimitRegister = registerAs(ConfigKeyEnum.RATE_LIMIT, (): RateLimitType => {
	const limit = Number(process.env.THROTTLE_LIMIT);
	const ttl = Number(process.env.THROTTLE_TTL);

	if (!limit || !ttl) {
		throw new Error("Missing required environment variables");
	}

	return {
		limit,
		ttl,
	};
});
