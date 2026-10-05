import { Router } from "express";
import { type ValidatedRequest, validate } from "../../common/http/validate.js";
import type { UserService } from "./user.service.js";
import { createUserBodySchema, listUsersQuerySchema, updateUserBodySchema, userIdParamsSchema } from "./user.schema.js";

const idParams = { params: userIdParamsSchema };
const listSchemas = { query: listUsersQuerySchema };
const createSchemas = { body: createUserBodySchema };
const updateSchemas = { body: updateUserBodySchema, params: userIdParamsSchema };

export const createUserRouter = (service: UserService): Router => {
	const router = Router();

	router.get("/", validate(listSchemas), async (request, response) => {
		const { validated } = request as ValidatedRequest<typeof listSchemas>;
		const { items, total } = await service.list(validated.query);

		response.json({ data: items, meta: { limit: validated.query.limit, offset: validated.query.offset, total } });
	});

	router.post("/", validate(createSchemas), async (request, response) => {
		const { validated } = request as ValidatedRequest<typeof createSchemas>;

		response.status(201).json({ data: await service.create(validated.body) });
	});

	router.get("/:id", validate(idParams), async (request, response) => {
		const { validated } = request as ValidatedRequest<typeof idParams>;

		response.json({ data: await service.get(validated.params.id) });
	});

	router.patch("/:id", validate(updateSchemas), async (request, response) => {
		const { validated } = request as ValidatedRequest<typeof updateSchemas>;

		response.json({ data: await service.update(validated.params.id, validated.body) });
	});

	router.delete("/:id", validate(idParams), async (request, response) => {
		const { validated } = request as ValidatedRequest<typeof idParams>;

		await service.delete(validated.params.id);
		response.status(204).send();
	});

	return router;
};
