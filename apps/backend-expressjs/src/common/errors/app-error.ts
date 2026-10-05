export type ErrorCode = "BAD_REQUEST" | "CONFLICT" | "INTERNAL_ERROR" | "NOT_FOUND" | "TIMEOUT" | "VALIDATION_ERROR";

export type ErrorDetails = ReadonlyArray<{ readonly message: string; readonly path: string }>;

export class AppError extends Error {
	readonly code: ErrorCode;
	readonly details: ErrorDetails | undefined;
	readonly statusCode: number;

	constructor(statusCode: number, code: ErrorCode, message: string, details?: ErrorDetails) {
		super(message);
		this.name = "AppError";
		this.statusCode = statusCode;
		this.code = code;
		this.details = details;
	}

	static badRequest(message: string): AppError {
		return new AppError(400, "BAD_REQUEST", message);
	}

	static conflict(message: string): AppError {
		return new AppError(409, "CONFLICT", message);
	}

	static notFound(message: string): AppError {
		return new AppError(404, "NOT_FOUND", message);
	}

	static validation(details: ErrorDetails): AppError {
		return new AppError(422, "VALIDATION_ERROR", "Request validation failed", details);
	}
}
