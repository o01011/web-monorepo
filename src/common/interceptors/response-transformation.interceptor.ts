import {
	CallHandler,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { catchError, map, Observable, throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

interface SuccessResponse<T> {
	requestId: string;
	statusCode: number;
	statusMessage: string;
	timestamp: string;
	version: string;
	path: string;
	data: T;
}

interface ErrorResponse {
	requestId: string;
	statusCode: number;
	statusMessage: string;
	error: string;
	timestamp: string;
	version: string;
	path: string;
}

@Injectable()
export class ResponseTransformationInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const ctx = context.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();
		const requestId = uuidv4();

		response.setHeader('X-Request-Id', requestId);

		return next.handle().pipe(
			map((data): SuccessResponse<typeof data> => {
				const statusCode = response.statusCode;
				const isErrorStatus = statusCode >= HttpStatus.BAD_REQUEST;

				return {
					requestId,
					statusCode,
					statusMessage: isErrorStatus ? 'Error' : 'Success',
					timestamp: new Date().toISOString(),
					version: this.getApiVersion(request),
					path: request.url,
					data: isErrorStatus ? null : data,
				};
			}),
			catchError(e => {
				const statusCode = e instanceof HttpException ? e.getStatus() : 500;

				const errorResponse: ErrorResponse = {
					requestId,
					statusCode,
					statusMessage: e.message || 'Internal server error',
					error: e.name || 'HttpException',
					timestamp: new Date().toISOString(),
					version: this.getApiVersion(request),
					path: request.path,
				};

				return throwError(() => new HttpException(errorResponse, statusCode));
			}),
		);
	}

	private getApiVersion(request: Request): string {
		const versionFromPath = request.path.split('/')[1];
		return versionFromPath.startsWith('v') ? versionFromPath : 'v1';
	}
}
