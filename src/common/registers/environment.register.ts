import { registerAs } from "@nestjs/config";
import { ConfigKeysConst } from "../constants/config-keys.const.js";
import type { EnvironmentType } from "../types/environment.type.js";

export const environmentRegister = registerAs(ConfigKeysConst.ENVIRONMENT, (): EnvironmentType => {
	const nodeEnv = process.env.NODE_ENV;

	if (!nodeEnv) {
		throw new Error("Missing required environment variables");
	}

	return {
		nodeEnv,
	};
});
