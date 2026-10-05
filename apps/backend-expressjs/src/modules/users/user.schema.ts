import { z } from "zod";

export const userIdParamsSchema = z.object({ id: z.coerce.number().int().positive() });

export const listUsersQuerySchema = z.object({
	limit: z.coerce.number().int().min(1).max(100).default(20),
	offset: z.coerce.number().int().min(0).default(0),
});

export const createUserBodySchema = z.object({
	email: z.email(),
	firstName: z.string().trim().min(1).max(100),
	lastName: z.string().trim().min(1).max(100),
	password: z.string().min(8).max(128),
	username: z.string().trim().min(3).max(32).regex(/^\w+$/),
});

export const updateUserBodySchema = createUserBodySchema.omit({ password: true }).partial();

export type CreateUserInput = z.output<typeof createUserBodySchema>;
export type UpdateUserInput = z.output<typeof updateUserBodySchema>;
export type ListUsersQuery = z.output<typeof listUsersQuerySchema>;
