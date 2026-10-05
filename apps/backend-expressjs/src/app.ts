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
import { createHealthRouter, type HealthCheck } from "./modules/health/health.routes.js";
import { createUserRouter } from "./modules/users/user.routes.js";
import type { UserService } from "./modules/users/user.service.js";

export type AppDependencies = {
	checkDatabase: HealthCheck;
	env: Env;
	logger: Logger;
	userService: UserService;
};

export const createApp = ({ checkDatabase, env, logger, userService }: AppDependencies): Express => {
	const app = express();

	app.disable("x-powered-by");
	app.set("trust proxy", 1);

	app.use(pinoHttp({ genReqId: (request) => request.headers["x-request-id"]?.toString() ?? randomUUID(), logger }));
	app.use(helmet());
	app.use(cors({ origin: env.CORS_ORIGINS }));
	app.use(rateLimit({ limit: env.THROTTLE_LIMIT, windowMs: env.THROTTLE_TTL }));
	app.use(requestTimeout(env.APP_REQUEST_TIMEOUT));
	app.use(express.json({ limit: "100kb" }));

	app.use("/health", createHealthRouter(checkDatabase));
	app.use("/api/v1/users", createUserRouter(userService));

	app.use(notFoundHandler);
	app.use(errorHandler);

	return app;
};
