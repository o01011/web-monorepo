import { IResponse } from '@common/interfaces';
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

@Injectable()
export class ResponseTransformationInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const ctx = context.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();

		return next.handle().pipe(
			map((data): IResponse<typeof data> => {
				const statusCode = response.statusCode;
				const isErrorStatus = statusCode >= HttpStatus.BAD_REQUEST;

				const successResponse: IResponse<typeof data> = {
					statusCode,
					statusMessage: isErrorStatus ? 'Error' : 'Success',
					timestamp: new Date().toISOString(),
					version: this.getApiVersion(request),
					path: request.url,
					error: null,
					data: isErrorStatus ? null : data,
				};

				return successResponse;
			}),
			catchError(e => {
				const statusCode = e instanceof HttpException ? e.getStatus() : 500;
				const errorMessage = e.message || 'Internal server error';
				const errorName = e.name || 'Error';

				const errorResponse: IResponse<null> = {
					statusCode,
					statusMessage: e.message || 'Internal server error',
					timestamp: new Date().toISOString(),
					version: this.getApiVersion(request),
					path: request.path,
					error: {
						name: errorName,
						message: errorMessage,
						details: e.response?.error || null,
					},
					data: null,
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
