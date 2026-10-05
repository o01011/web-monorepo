import { createApp } from "./app.js";
import { loadEnv } from "./config/env.js";
import { createLogger } from "./lib/logger.js";
import { createPrismaClient } from "./lib/prisma.js";
import { createAuthService } from "./modules/auth/auth.service.js";
import { createUserRepository } from "./modules/users/user.repository.js";
import { createUserService } from "./modules/users/user.service.js";

const SHUTDOWN_TIMEOUT_MS = 10_000;

const bootstrap = async (): Promise<void> => {
	const env = loadEnv();
	const logger = createLogger(env);
	const prisma = createPrismaClient(env.POSTGRES_URL);

	try {
		await prisma.$connect();
	} catch (error) {
		logger.fatal({ err: error }, "Failed to connect to the database");
		try {
			await prisma.$disconnect();
		} catch (disconnectError) {
			logger.error({ err: disconnectError }, "Failed to disconnect Prisma after startup error");
		}
		process.exitCode = 1;
		return;
	}

	const userRepository = createUserRepository(prisma);
	const userService = createUserService(userRepository);

	const app = createApp({
		authService: createAuthService(userRepository, userService, env),
		checkDatabase: async () => {
			await prisma.$queryRaw`SELECT 1`;
		},
		env,
		logger,
		userService,
	});

	const server = app.listen(env.APP_PORT, () => {
		logger.info({ port: env.APP_PORT }, "Server listening");
	});

	let shuttingDown = false;
	const shutdown = (signal: NodeJS.Signals): void => {
		if (shuttingDown) {
			return;
		}

		shuttingDown = true;
		logger.info({ signal }, "Shutting down");

		const forceShutdown = setTimeout(() => {
			logger.error({ timeoutMs: SHUTDOWN_TIMEOUT_MS }, "Graceful shutdown timed out");
			server.closeAllConnections();
			process.exit(1);
		}, SHUTDOWN_TIMEOUT_MS);

		server.close((error) => {
			if (error) {
				logger.error({ err: error }, "Failed to close the HTTP server");
				process.exitCode = 1;
			}

			void prisma
				.$disconnect()
				.then(() => logger.info("Prisma disconnected"))
				.catch((disconnectError: unknown) => {
					logger.error({ err: disconnectError }, "Failed to disconnect Prisma");
					process.exitCode = 1;
				})
				.finally(() => clearTimeout(forceShutdown));
		});
		server.closeIdleConnections();
	};

	process.once("SIGINT", shutdown);
	process.once("SIGTERM", shutdown);
};

bootstrap().catch((error: unknown) => {
	console.error("Failed to start the Express application", error);
	process.exitCode = 1;
});
