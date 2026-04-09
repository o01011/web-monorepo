import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../enums/config.enum.js";
import type { DbType } from "../types/db.type.js";

export const dbRegister = registerAs(ConfigKeyEnum.DB, (): DbType => {
	const postgresUrl = process.env.POSTGRES_URL;

	if (!postgresUrl) {
		throw new Error("Missing required environment variables");
	}

	return {
		postgresUrl,
	};
});
