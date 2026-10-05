import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { z } from "zod";
import { AppError } from "../errors/app-error.js";

type RequestSchemas = {
	body?: z.ZodType;
	params?: z.ZodType;
	query?: z.ZodType;
};

type Infer<TSchema extends z.ZodType | undefined> = TSchema extends z.ZodType ? z.output<TSchema> : unknown;

export type ValidatedRequest<TSchemas extends RequestSchemas> = Request & {
	validated: {
		body: Infer<TSchemas["body"]>;
		params: Infer<TSchemas["params"]>;
		query: Infer<TSchemas["query"]>;
	};
};

/**
 * Parses body/params/query with zod and exposes the typed result on `request.validated`.
 * Express 5 makes `request.query` a read-only getter, so parsed values are never written back to it.
 */
export const validate =
	<TSchemas extends RequestSchemas>(schemas: TSchemas): RequestHandler =>
	(request: Request, _response: Response, next: NextFunction): void => {
		const issues: Array<{ message: string; path: string }> = [];
		const validated: Record<string, unknown> = {};

		for (const key of ["body", "params", "query"] as const) {
			const schema = schemas[key];

			if (!schema) {
				continue;
			}

			const result = schema.safeParse(request[key]);

			if (result.success) {
				validated[key] = result.data;
			} else {
				issues.push(...result.error.issues.map((issue) => ({ message: issue.message, path: [key, ...issue.path].join(".") })));
			}
		}

		if (issues.length > 0) {
			next(AppError.validation(issues));
			return;
		}

		(request as ValidatedRequest<TSchemas>).validated = validated as ValidatedRequest<TSchemas>["validated"];
		next();
	};
