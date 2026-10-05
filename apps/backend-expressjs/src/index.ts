import { createApp } from "./app.js";
import { loadEnv } from "./config/env.js";
import { createLogger } from "./lib/logger.js";
import { createPrismaClient } from "./lib/prisma.js";
import { createUserRepository } from "./modules/users/user.repository.js";
import { createUserService } from "./modules/users/user.service.js";

const SHUTDOWN_TIMEOUT_MS = 10_000;

const bootstrap = async (): Promise<void> => {
	const env = loadEnv();
	const logger = createLogger(env);
	const prisma = createPrismaClient(env.POSTGRES_URL);

	await prisma.$connect();

	const app = createApp({
		checkDatabase: async () => {
			await prisma.$queryRaw`SELECT 1`;
		},
		env,
		logger,
		userService: createUserService(createUserRepository(prisma)),
	});

	const server = app.listen(env.APP_PORT, () => {
		logger.info({ port: env.APP_PORT }, "Server listening");
	});

	const shutdown = (signal: NodeJS.Signals): void => {
		logger.info({ signal }, "Shutting down");
		setTimeout(() => process.exit(1), SHUTDOWN_TIMEOUT_MS).unref();

		server.close(async () => {
			await prisma.$disconnect();
			process.exit(0);
		});
		server.closeIdleConnections();
	};

	process.once("SIGINT", shutdown);
	process.once("SIGTERM", shutdown);
};

bootstrap().catch((error: unknown) => {
	console.error(error);
	process.exit(1);
});
