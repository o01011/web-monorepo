import request from "supertest";
import { describe, expect, it } from "vitest";
import { pino } from "pino";
import { createApp } from "./app.js";
import { loadEnv } from "./config/env.js";
import { AppError } from "./common/errors/app-error.js";
import type { UserService } from "./modules/users/user.service.js";

const user = {
	createdAt: "2026-01-01T00:00:00.000Z",
	email: "a@b.co",
	firstName: "A",
	id: 1,
	lastName: "B",
	updatedAt: "2026-01-01T00:00:00.000Z",
	username: "ab",
};

const userService: UserService = {
	create: async () => user,
	delete: async () => undefined,
	get: async (id) => {
		if (id !== 1) {
			throw AppError.notFound("User not found");
		}
		return user;
	},
	list: async () => ({ items: [user], total: 1 }),
	update: async () => user,
};

const app = createApp({
	checkDatabase: async () => undefined,
	env: loadEnv({ NODE_ENV: "test", POSTGRES_URL: "postgresql://u:p@localhost:5432/db" }),
	logger: pino({ level: "silent" }),
	userService,
});

describe("app", () => {
	it("reports liveness", async () => {
		await request(app).get("/health/live").expect(200, { status: "ok" });
	});

	it("returns a user", async () => {
		const response = await request(app).get("/api/v1/users/1").expect(200);
		expect(response.body.data.id).toBe(1);
	});

	it("maps domain errors to responses", async () => {
		const response = await request(app).get("/api/v1/users/2").expect(404);
		expect(response.body.error.code).toBe("NOT_FOUND");
	});

	it("rejects invalid input with details", async () => {
		const response = await request(app).post("/api/v1/users").send({ email: "nope" }).expect(422);
		expect(response.body.error.code).toBe("VALIDATION_ERROR");
		expect(response.body.error.details.length).toBeGreaterThan(0);
	});

	it("returns 404 for unknown routes", async () => {
		await request(app).get("/nope").expect(404);
	});
});
