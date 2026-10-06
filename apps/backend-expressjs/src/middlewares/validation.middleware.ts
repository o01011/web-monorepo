import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { type ZodType, ZodError } from "zod";

export const validateMiddleware = (schema: ZodType) => {
	return (req: Request, _res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			next();
		} catch (e) {
			if (e instanceof ZodError) {
				const details: Record<string, string[]> = {};

				for (const issue of e.issues) {
					const path = issue.path.join(".");
					if (!details[path]) {
						details[path] = [];
					}
					details[path]?.push(issue.message);
				}
				next({
					statusCode: StatusCodes.BAD_REQUEST,
					message: "Validation failed",
					code: "VALIDATION_ERROR",
					details,
				});
				return;
			}
			next(e);
		}
	};
};
