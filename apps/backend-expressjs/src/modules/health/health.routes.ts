import { Router } from "express";

export type HealthCheck = () => Promise<void>;

export const createHealthRouter = (checkDatabase: HealthCheck): Router => {
	const router = Router();

	router.get("/live", (_request, response) => {
		response.json({ status: "ok" });
	});

	router.get("/ready", async (request, response) => {
		try {
			await checkDatabase();
			response.json({ status: "ok" });
		} catch (error) {
			request.log.error({ err: error }, "Readiness check failed");
			response.status(503).json({ status: "unavailable" });
		}
	});

	return router;
};
