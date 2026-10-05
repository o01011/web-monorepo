import { z } from "zod";

export const taskSchema = z.object({
	id: z.string().uuid(),
	title: z.string().min(1, "Title is required").max(200),
	description: z.string().max(2000).optional(),
	status: z.enum(["todo", "in_progress", "done"]).default("todo"),
	priority: z.enum(["low", "medium", "high"]).default("medium"),
	dueDate: z.coerce.date().optional(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const createTaskSchema = z.object({
	body: z.object({
		title: z.string().min(1, "Title is required").max(200),
		description: z.string().max(2000).optional(),
		status: z.enum(["todo", "in_progress", "done"]).default("todo"),
		priority: z.enum(["low", "medium", "high"]).default("medium"),
		dueDate: z.coerce.date().optional(),
	}),
});

export const updateTaskSchema = z.object({
	body: z.object({
		title: z.string().min(1).max(200).optional(),
		description: z.string().max(2000).optional(),
		status: z.enum(["todo", "in_progress", "done"]).optional(),
		priority: z.enum(["low", "medium", "high"]).optional(),
		dueDate: z.coerce.date().optional(),
	}),
	params: z.object({
		id: z.string().uuid("Invalid task ID format"),
	}),
});

export const getTaskSchema = z.object({
	params: z.object({
		id: z.string().uuid("Invalid task ID format"),
	}),
});

export const listTasksSchema = z.object({
	query: z.object({
		status: z.enum(["todo", "in_progress", "done"]).optional(),
		priority: z.enum(["low", "medium", "high"]).optional(),
		page: z.coerce.number().int().positive().default(1),
		limit: z.coerce.number().int().positive().max(100).default(20),
		sortBy: z.enum(["createdAt", "dueDate", "priority"]).default("createdAt"),
		order: z.enum(["asc", "desc"]).default("desc"),
	}),
});

export type Task = z.infer<typeof taskSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>["body"];
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>["body"];
export type GetTaskQuery = z.infer<typeof listTasksSchema>["query"];
