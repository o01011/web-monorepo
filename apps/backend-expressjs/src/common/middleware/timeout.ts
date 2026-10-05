import type { RequestHandler } from "express";

export const requestTimeout =
	(timeoutMs: number): RequestHandler =>
	(_request, response, next): void => {
		response.setTimeout(timeoutMs, () => {
			if (!response.headersSent) {
				response.status(503).json({ error: { code: "TIMEOUT", message: "Request timed out" } });
			}
		});
		next();
	};
