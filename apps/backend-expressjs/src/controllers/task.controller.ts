import type { Request, Response, NextFunction } from "express";
import { TaskService } from "../services/task.service.ts";
import type { CreateTaskInput, ListTasksQuery, UpdateTaskInput } from "../schemas/task.schema.ts";

export class TaskController {
	private taskService = new TaskService();

	list = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const query = req.query as unknown as ListTasksQuery;
			const result = await this.taskService.list(query);
			res.json({
				data: result.tasks,
				pagination: {
					page: result.page,
					limit: result.limit,
					total: result.total,
					totalPages: Math.ceil(result.total / result.limit),
				},
			});
		} catch (e) {
			next(e);
		}
	};

	getById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
		try {
			const task = await this.taskService.getById(req.params["id"]);
			res.json({
				data: task,
			});
		} catch (e) {
			next(e);
		}
	};

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const createTaskInput = req.body as CreateTaskInput;
			const createdTask = await this.taskService.create(createTaskInput);
			res.json({ data: createdTask });
		} catch (e) {
			next(e);
		}
	};

	update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
		try {
			const updateTaskInput = req.body as UpdateTaskInput;
			const updatedTask = await this.taskService.update(req.params["id"], updateTaskInput);
			res.json({ data: updatedTask });
		} catch (e) {
			next(e);
		}
	};

	delete = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
		try {
			await this.taskService.delete(req.params["id"]);
			res.status(204).send();
		} catch (e) {
			next(e);
		}
	};
}
