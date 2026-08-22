import { registerAs } from "@nestjs/config";
import { ConfigKeysConst } from "../constants/config-keys.const.js";
import type { RateLimitType } from "../types/rate-limiting.type.js";

export const rateLimitRegister = registerAs(ConfigKeysConst.RATE_LIMIT, (): RateLimitType => {
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
