import { Router } from "express";
import { TaskController } from "../controllers/task.controller.ts";
import { validateMiddleware } from "../middlewares/validation.middleware.ts";
import { createTaskSchema, getTaskSchema, listTasksSchema, updateTaskSchema } from "../schemas/task.schema.ts";

const router = Router();
const controller = new TaskController();

router
	.get("/", validateMiddleware(listTasksSchema), controller.list)
	.get("/:id", validateMiddleware(getTaskSchema), controller.getById)
	.post("/", validateMiddleware(createTaskSchema), controller.create)
	.put("/:id", validateMiddleware(updateTaskSchema), controller.update)
	.delete("/", validateMiddleware(getTaskSchema), controller.delete);

export default router;
