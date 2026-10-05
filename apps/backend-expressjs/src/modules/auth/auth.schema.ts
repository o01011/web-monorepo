import { z } from "zod";
import { createUserBodySchema } from "../users/user.schema.js";

export const registerBodySchema = createUserBodySchema;

export const loginBodySchema = z.object({
	email: z.email().transform((value) => value.trim().toLowerCase()),
	password: z.string().min(1).max(128),
});

export type RegisterInput = z.output<typeof registerBodySchema>;
export type LoginInput = z.output<typeof loginBodySchema>;
