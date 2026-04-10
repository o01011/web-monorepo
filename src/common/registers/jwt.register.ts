import { registerAs } from "@nestjs/config";
import { ConfigKeysConst } from "../constants/config-keys.const.js";
import type { JwtType } from "../types/jwt.type.js";

export const jwtRegister = registerAs(ConfigKeysConst.JWT, (): JwtType => {
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
