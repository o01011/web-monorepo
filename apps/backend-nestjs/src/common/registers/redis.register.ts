import { registerAs } from "@nestjs/config";
import { ConfigKeysConst } from "../constants/config-keys.const.js";
import type { RedisType } from "../types/redis.type.js";

export const redisRegister = registerAs(ConfigKeysConst.REDIS, (): RedisType => {
	const redisUrl = process.env.REDIS_URL;

	if (!redisUrl) {
		throw new Error("Missing required environment variables");
	}

	return {
		redisUrl,
	};
});
