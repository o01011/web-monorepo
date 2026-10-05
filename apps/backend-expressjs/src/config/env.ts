import { z } from "zod";

const envSchema = z.object({
	APP_LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info"),
	APP_PORT: z.coerce.number().int().min(1).max(65535).default(3000),
	APP_REQUEST_TIMEOUT: z.coerce.number().int().positive().default(30_000),
	CORS_ORIGINS: z
		.string()
		.default("")
		.transform((value) =>
			value
				.split(",")
				.map((origin) => origin.trim())
				.filter(Boolean),
		),
	NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
	POSTGRES_URL: z.url(),
	THROTTLE_LIMIT: z.coerce.number().int().positive().default(100),
	THROTTLE_TTL: z.coerce.number().int().positive().default(60_000),
});

export type Env = z.infer<typeof envSchema>;

export const loadEnv = (source: NodeJS.ProcessEnv = process.env): Env => {
	const result = envSchema.safeParse(source);

	if (!result.success) {
		throw new Error(`Invalid environment variables:\n${z.prettifyError(result.error)}`);
	}

	return result.data;
};
