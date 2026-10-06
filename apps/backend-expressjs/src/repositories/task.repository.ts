import type { CreateTaskInput, ListTasksQuery, Task, UpdateTaskInput } from "../schemas/task.schema.ts";
import { v4 as uuidv4 } from "uuid";

const tasks: Map<string, Task> = new Map();

export class TaskRepository {
	async findMany(query: ListTasksQuery): Promise<{ tasks: Task[]; total: number }> {
		let results = Array.from(tasks.values());

		if (query.status) {
			results = results.filter((t) => t.status === query.status);
		}
		if (query.priority) {
			results = results.filter((t) => t.priority === query.priority);
		}

		results.sort((a, b) => {
			const field = query.sortBy;
			const aVal = a[field];
			const bVal = b[field];

			if (aVal === undefined || bVal === undefined) return 0;
			if (aVal < bVal) return query.order === "asc" ? -1 : 1;
			if (aVal > bVal) return query.order === "asc" ? 1 : -1;
			return 0;
		});

		const total = results.length;

		const offset = (query.page - 1) * query.limit;
		results = results.slice(offset, offset + query.limit);

		return {
			tasks: results,
			total,
		};
	}

	async findById(id: string): Promise<Task | undefined> {
		return tasks.get(id);
	}

	async create(data: CreateTaskInput): Promise<Task> {
		const now = new Date();

		const task: Task = {
			id: uuidv4(),
			...data,
			status: data.status ?? "todo",
			priority: data.priority ?? "medium",
			createdAt: now,
			updatedAt: now,
		};
		tasks.set(task.id, task);

		return task;
	}

	async update(id: string, data: UpdateTaskInput): Promise<Task | null> {
		const existing = tasks.get(id);
		if (!existing) return null;

		const updated: Task = {
			...existing,
			...data,
			updatedAt: new Date(),
		};
		tasks.set(id, updated);

		return updated;
	}

	async delete(id: string): Promise<boolean> {
		return tasks.delete(id);
	}

	async existsByTitle(tiitle: string, excludeId?: string): Promise<boolean> {
		for (const task of tasks.values()) {
			if (task.title === tiitle && task.id !== excludeId) return true;
		}
		return false;
	}
}
