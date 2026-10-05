import cors from "cors";
import express, { type Express } from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import type { Logger } from "pino";
import { pinoHttp } from "pino-http";
import { randomUUID } from "node:crypto";
import { errorHandler, notFoundHandler } from "./common/middleware/error-handler.js";
import { requestTimeout } from "./common/middleware/timeout.js";
import type { Env } from "./config/env.js";
import { createAuthRouter } from "./modules/auth/auth.routes.js";
import type { AuthService } from "./modules/auth/auth.service.js";
import { createHealthRouter, type HealthCheck } from "./modules/health/health.routes.js";
import { createUserRouter } from "./modules/users/user.routes.js";
import type { UserService } from "./modules/users/user.service.js";

export type AppDependencies = {
	checkDatabase: HealthCheck;
	env: Env;
	logger: Logger;
	authService: AuthService;
	userService: UserService;
};

export const createApp = ({ authService, checkDatabase, env, logger, userService }: AppDependencies): Express => {
	const app = express();

	app.disable("x-powered-by");
	app.set("trust proxy", env.TRUST_PROXY_HOPS);

	app.use(
		pinoHttp({
			genReqId: (request) => {
				const requestId = request.headers["x-request-id"];

				return typeof requestId === "string" && /^[A-Za-z0-9._:-]{1,128}$/.test(requestId) ? requestId : randomUUID();
			},
			logger,
		}),
	);
	app.use(helmet());
	app.use(cors({ origin: env.CORS_ORIGINS }));
	app.use("/api", rateLimit({ limit: env.THROTTLE_LIMIT, windowMs: env.THROTTLE_TTL }));
	const credentialRateLimit = rateLimit({ limit: 10, windowMs: 15 * 60 * 1000, standardHeaders: "draft-8", legacyHeaders: false });
	app.use("/api/v1/auth/register", credentialRateLimit);
	app.use("/api/v1/auth/login", credentialRateLimit);
	app.use(requestTimeout(env.APP_REQUEST_TIMEOUT));
	app.use(express.json({ limit: "100kb" }));

	app.use("/health", createHealthRouter(checkDatabase));
	app.use("/api/v1/auth", createAuthRouter(authService, userService));
	app.use("/api/v1/users", createUserRouter(userService, authService));

	app.use(notFoundHandler);
	app.use(errorHandler);

	return app;
};
