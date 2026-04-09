import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../enums/config.enum.js";
import type { AppType } from "../types/app.type.js";

export const appRegister = registerAs(ConfigKeyEnum.APP, (): AppType => {
	const appDescription = process.env.APP_DESCRIPTION;
	const appLogLevel = Number(process.env.APP_LOG_LEVEL);
	const appName = process.env.APP_NAME;
	const appPort = Number(process.env.APP_PORT);
	const appRequestTimeout = Number(process.env.APP_REQUEST_TIMEOUT);

	if (!appDescription || !appLogLevel || !appName || !appPort || !appRequestTimeout) {
		throw new Error("Missing required environment variables");
	}

	return {
		appDescription,
		appLogLevel,
		appName,
		appPort,
		appRequestTimeout,
	};
});
