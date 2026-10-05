import { describe, expect, it } from "vitest";
import type { User } from "@web-monorepo/db";
import { AppError } from "../../common/errors/app-error.js";
import { loadEnv } from "../../config/env.js";
import { hashPassword } from "../../lib/password.js";
import { toUserDto } from "../users/user.dto.js";
import type { UserRepository } from "../users/user.repository.js";
import type { UserService } from "../users/user.service.js";
import { createAuthService } from "./auth.service.js";

describe("auth service", () => {
	it("issues signed tokens and reads the current role from the database", async () => {
		const storedUser: User = {
			createdAt: new Date("2026-01-01T00:00:00.000Z"),
			email: "user@example.com",
			firstName: "Test",
			id: 1,
			lastName: "User",
			password: await hashPassword("a-long-test-password"),
			role: "USER",
			updatedAt: new Date("2026-01-01T00:00:00.000Z"),
			username: "test_user",
		};
		let currentUser = storedUser;
		const repository: UserRepository = {
			create: async () => storedUser,
			delete: async () => undefined,
			findByEmail: async (email) => (email.toLowerCase() === storedUser.email ? currentUser : null),
			findById: async (id) => (id === currentUser.id ? currentUser : null),
			list: async () => ({ items: [currentUser], total: 1 }),
			update: async () => storedUser,
			updateRole: async (_id, role) => ({ ...storedUser, role }),
		};
		const userDto = toUserDto(storedUser);
		const userService: UserService = {
			create: async () => userDto,
			delete: async () => undefined,
			get: async () => toUserDto(currentUser),
			list: async () => ({ items: [userDto], total: 1 }),
			update: async () => userDto,
			updateRole: async (_id, role) => ({ ...userDto, role }),
		};
		const authService = createAuthService(
			repository,
			userService,
			loadEnv({
				JWT_SECRET: "a-test-secret-at-least-32-characters-long",
				NODE_ENV: "test",
				POSTGRES_URL: "postgresql://localhost:5432/db",
			}),
		);

		const result = await authService.login({ email: "user@example.com", password: "a-long-test-password" });
		expect(result.tokenType).toBe("Bearer");
		expect(result.user).not.toHaveProperty("password");
		expect(await authService.authenticate(result.accessToken)).toEqual({ role: "USER", userId: 1 });

		currentUser = { ...currentUser, role: "ADMIN" };
		expect(await authService.authenticate(result.accessToken)).toEqual({ role: "ADMIN", userId: 1 });

		await expect(authService.authenticate(`${result.accessToken}x`)).rejects.toMatchObject({
			code: "UNAUTHORIZED",
		});
	});

	it("uses one generic error for invalid credentials", async () => {
		const repository: UserRepository = {
			create: async () => {
				throw new Error("Not used");
			},
			delete: async () => undefined,
			findByEmail: async () => null,
			findById: async () => null,
			list: async () => ({ items: [], total: 0 }),
			update: async () => {
				throw new Error("Not used");
			},
			updateRole: async () => {
				throw new Error("Not used");
			},
		};
		const userService: UserService = {
			create: async () => {
				throw new Error("Not used");
			},
			delete: async () => undefined,
			get: async () => {
				throw new Error("Not used");
			},
			list: async () => ({ items: [], total: 0 }),
			update: async () => {
				throw new Error("Not used");
			},
			updateRole: async () => {
				throw new Error("Not used");
			},
		};
		const authService = createAuthService(
			repository,
			userService,
			loadEnv({
				JWT_SECRET: "a-test-secret-at-least-32-characters-long",
				NODE_ENV: "test",
				POSTGRES_URL: "postgresql://localhost:5432/db",
			}),
		);

		await expect(authService.login({ email: "unknown@example.com", password: "any-password" })).rejects.toMatchObject({
			code: "UNAUTHORIZED",
			message: "Invalid email or password",
		} satisfies Partial<AppError>);
	});
});
