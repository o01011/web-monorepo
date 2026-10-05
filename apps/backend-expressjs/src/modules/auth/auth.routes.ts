import { Router } from "express";
import { type ValidatedRequest, validate } from "../../common/http/validate.js";
import { AppError } from "../../common/errors/app-error.js";
import type { UserService } from "../users/user.service.js";
import { authenticate } from "./auth.middleware.js";
import { loginBodySchema, registerBodySchema } from "./auth.schema.js";
import type { AuthService } from "./auth.service.js";

const loginSchemas = { body: loginBodySchema };
const registerSchemas = { body: registerBodySchema };

export const createAuthRouter = (authService: AuthService, userService: UserService): Router => {
	const router = Router();

	router.post("/register", validate(registerSchemas), async (request, response) => {
		const { validated } = request as ValidatedRequest<typeof registerSchemas>;

		response
			.status(201)
			.set("Cache-Control", "no-store")
			.json({ data: await authService.register(validated.body) });
	});

	router.post("/login", validate(loginSchemas), async (request, response) => {
		const { validated } = request as ValidatedRequest<typeof loginSchemas>;

		response.set("Cache-Control", "no-store").json({ data: await authService.login(validated.body) });
	});

	router.get("/me", authenticate(authService), async (request, response) => {
		if (!request.auth) {
			throw AppError.unauthorized();
		}

		response.set("Cache-Control", "no-store").json({ data: await userService.get(request.auth.userId) });
	});

	return router;
};
