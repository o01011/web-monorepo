import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../enums/config.enum.js";
import type { JwtType } from "../types/jwt.type.js";

export const jwtRegister = registerAs(ConfigKeyEnum.JWT, (): JwtType => {
	const expiresIn = Number(process.env.JWT_EXPIRES_IN);
	const secret = process.env.JWT_SECRET;

	if (!expiresIn || !secret) {
		throw new Error("Missing required environment variables");
	}

	return {
		expiresIn,
		secret,
	};
});
