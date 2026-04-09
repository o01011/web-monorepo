import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../enums/config.enum.js";
import type { EnvironmentType } from "../types/environment.type.js";

export const environmentRegister = registerAs(ConfigKeyEnum.ENVIRONMENT, (): EnvironmentType => {
	const nodeEnv = process.env.NODE_ENV;

	if (!nodeEnv) {
		throw new Error("Missing required environment variables");
	}

	return {
		nodeEnv,
	};
});
