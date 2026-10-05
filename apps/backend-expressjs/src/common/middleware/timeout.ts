import type { RequestHandler } from "express";

export const requestTimeout =
	(timeoutMs: number): RequestHandler =>
	(request, response, next): void => {
		response.setTimeout(timeoutMs, () => {
			if (!response.headersSent) {
				request.log.warn({ timeoutMs }, "Request timed out");
				response.status(503).json({
					error: {
						code: "TIMEOUT",
						message: "Request timed out",
						requestId: request.id,
					},
				});
			}
		});
		next();
	};
