import { randomBytes } from "node:crypto";
import { sign, verify } from "jsonwebtoken";
import type { Env } from "../../config/env.js";
import { AppError } from "../../common/errors/app-error.js";
import { hashPassword, verifyPassword } from "../../lib/password.js";
import type { UserRepository } from "../users/user.repository.js";
import type { UserDto } from "../users/user.dto.js";
import type { UserService } from "../users/user.service.js";
import type { LoginInput, RegisterInput } from "./auth.schema.js";

const JWT_ISSUER = "web-monorepo";
const JWT_AUDIENCE = "web-monorepo-api";

export type AuthPrincipal = {
	role: "USER" | "ADMIN";
	userId: number;
};

type AuthResult = {
	accessToken: string;
	expiresIn: number;
	tokenType: "Bearer";
	user: UserDto;
};

export type AuthService = {
	authenticate(token: string): Promise<AuthPrincipal>;
	login(input: LoginInput): Promise<AuthResult>;
	register(input: RegisterInput): Promise<AuthResult>;
};

export const createAuthService = (repository: UserRepository, userService: UserService, env: Env): AuthService => {
	const dummyPasswordHash = hashPassword(randomBytes(32).toString("hex"));

	const createResult = (user: UserDto): AuthResult => ({
		accessToken: sign({}, env.JWT_SECRET, {
			algorithm: "HS256",
			audience: JWT_AUDIENCE,
			expiresIn: env.JWT_EXPIRES_IN,
			issuer: JWT_ISSUER,
			subject: String(user.id),
		}),
		expiresIn: env.JWT_EXPIRES_IN,
		tokenType: "Bearer",
		user,
	});

	return {
		authenticate: async (token) => {
			let payload: string | import("jsonwebtoken").JwtPayload;

			try {
				payload = verify(token, env.JWT_SECRET, {
					algorithms: ["HS256"],
					audience: JWT_AUDIENCE,
					issuer: JWT_ISSUER,
				});
			} catch {
				throw AppError.unauthorized("Invalid or expired access token");
			}

			if (typeof payload === "string" || typeof payload.sub !== "string" || !/^[1-9]\d*$/.test(payload.sub)) {
				throw AppError.unauthorized("Invalid or expired access token");
			}

			const userId = Number(payload.sub);
			if (!Number.isSafeInteger(userId)) {
				throw AppError.unauthorized("Invalid or expired access token");
			}

			const user = await repository.findById(userId);
			if (!user) {
				throw AppError.unauthorized("Invalid or expired access token");
			}

			return { role: user.role, userId: user.id };
		},

		login: async ({ email, password }) => {
			const user = await repository.findByEmail(email);

			const passwordMatches = await verifyPassword(password, user?.password ?? (await dummyPasswordHash));
			if (!user || !passwordMatches) {
				throw AppError.unauthorized("Invalid email or password");
			}

			return createResult(await userService.get(user.id));
		},

		register: async (input) => createResult(await userService.create(input)),
	};
};
