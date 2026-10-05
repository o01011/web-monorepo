import request from "supertest";
import { describe, expect, it } from "vitest";
import { pino } from "pino";
import { createApp } from "./app.js";
import { loadEnv } from "./config/env.js";
import { AppError } from "./common/errors/app-error.js";
import type { AuthService } from "./modules/auth/auth.service.js";
import type { UserService } from "./modules/users/user.service.js";

const user = {
	createdAt: "2026-01-01T00:00:00.000Z",
	email: "a@b.co",
	firstName: "A",
	id: 1,
	lastName: "B",
	role: "USER" as const,
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
	updateRole: async (_id, role) => ({ ...user, role }),
};

const authService: AuthService = {
	authenticate: async (token) => {
		if (token === "user-token") {
			return { role: "USER", userId: 1 };
		}

		if (token === "admin-token") {
			return { role: "ADMIN", userId: 2 };
		}

		throw AppError.unauthorized("Invalid or expired access token");
	},
	login: async () => {
		throw AppError.unauthorized("Invalid email or password");
	},
	register: async () => {
		throw AppError.conflict("Email is already in use");
	},
};

const app = createApp({
	authService,
	checkDatabase: async () => undefined,
	env: loadEnv({
		JWT_SECRET: "a-test-secret-at-least-32-characters-long",
		NODE_ENV: "test",
		POSTGRES_URL: "postgresql://localhost:5432/db",
	}),
	logger: pino({ level: "silent" }),
	userService,
});

describe("app", () => {
	it("does not trust forwarded client addresses by default", () => {
		expect(app.get("trust proxy")).toBe(0);
	});

	it("reports liveness", async () => {
		await request(app).get("/health/live").expect(200, { status: "ok" });
	});

	it("requires authentication for user routes", async () => {
		const response = await request(app).get("/api/v1/users/1").expect(401);
		expect(response.headers["www-authenticate"]).toBe("Bearer");
	});

	it("allows a user to read their own profile", async () => {
		const response = await request(app).get("/api/v1/users/1").set("Authorization", "Bearer user-token").expect(200);
		expect(response.body.data.id).toBe(1);
		expect(response.body.data).not.toHaveProperty("password");
	});

	it("blocks users from reading another user's profile", async () => {
		await request(app).get("/api/v1/users/2").set("Authorization", "Bearer user-token").expect(403);
	});

	it("does not allow users to assign themselves an admin role", async () => {
		const response = await request(app)
			.patch("/api/v1/users/1")
			.set("Authorization", "Bearer user-token")
			.send({ firstName: "Updated", role: "ADMIN" })
			.expect(200);

		expect(response.body.data.role).toBe("USER");
		await request(app).patch("/api/v1/users/1/role").set("Authorization", "Bearer user-token").send({ role: "ADMIN" }).expect(403);
	});

	it("restricts user listing to admins", async () => {
		await request(app).get("/api/v1/users").set("Authorization", "Bearer user-token").expect(403);
		await request(app).get("/api/v1/users").set("Authorization", "Bearer admin-token").expect(200);
	});

	it("maps domain errors to responses", async () => {
		const response = await request(app).get("/api/v1/users/3").set("Authorization", "Bearer admin-token").expect(404);
		expect(response.body.error.code).toBe("NOT_FOUND");
	});

	it("rejects invalid input with details", async () => {
		const response = await request(app).post("/api/v1/users").set("Authorization", "Bearer admin-token").send({ email: "nope" }).expect(422);
		expect(response.body.error.code).toBe("VALIDATION_ERROR");
		expect(response.body.error.details.length).toBeGreaterThan(0);
	});

	it("rejects empty user updates", async () => {
		const response = await request(app).patch("/api/v1/users/1").set("Authorization", "Bearer user-token").send({}).expect(422);
		expect(response.body.error.code).toBe("VALIDATION_ERROR");
	});

	it("returns 404 for unknown routes", async () => {
		await request(app).get("/nope").expect(404);
	});
});
