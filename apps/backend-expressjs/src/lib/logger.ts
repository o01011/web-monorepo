import pino, { type Logger } from "pino";
import type { Env } from "../config/env.js";

export const createLogger = (env: Pick<Env, "APP_LOG_LEVEL" | "NODE_ENV">): Logger =>
	pino({
		level: env.NODE_ENV === "test" ? "silent" : env.APP_LOG_LEVEL,
		redact: ["req.headers.authorization", "req.headers.cookie", "res.headers['set-cookie']"],
		...(env.NODE_ENV === "development" && { transport: { target: "pino-pretty" } }),
	});
