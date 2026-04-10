import { registerAs } from "@nestjs/config";
import { ConfigKeysConst } from "../constants/config-keys.const.js";
import type { PrismaType } from "../types/prisma.type.js";

export const prismaRegister = registerAs(ConfigKeysConst.PRISMA, (): PrismaType => {
	const postgresUrl = process.env.POSTGRES_URL;

	if (!postgresUrl) {
		throw new Error("Missing required environment variables");
	}

	return {
		postgresUrl,
	};
});
