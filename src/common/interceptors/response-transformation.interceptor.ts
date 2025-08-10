import { IResponse } from '@common/interfaces';
import {
	CallHandler,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { catchError, map, Observable, throwError } from 'rxjs';
import { PrismaStatusCodesEnum, ResponseStatusMessagesEnum } from '@common/enums';

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
					statusMessage: isErrorStatus
						? ResponseStatusMessagesEnum.ERROR
						: ResponseStatusMessagesEnum.SUCCESS,
					timestamp: new Date().toISOString(),
					version: this.getApiVersion(request),
					path: request.url,
					error: null,
					data,
				};

				return successResponse;
			}),
			catchError(e => {
				if (e instanceof Prisma.PrismaClientKnownRequestError) {
					return this.handlePrismaErrorResponse(e, request);
				}
				if (e instanceof HttpException) {
					return this.handleHttpException(e, request);
				}

				return this.handleUnexpectedError(e, request);
			}),
		);
	}

	private handlePrismaErrorResponse(
		error: Prisma.PrismaClientKnownRequestError,
		request: Request,
	): Observable<never> {
		const statusCode = PrismaStatusCodesEnum[error.code] || HttpStatus.INTERNAL_SERVER_ERROR;

		const errorResponse: IResponse<null> = {
			statusCode,
			statusMessage: ResponseStatusMessagesEnum.ERROR,
			timestamp: new Date().toISOString(),
			version: this.getApiVersion(request),
			path: request.url,
			error: {
				message: error.meta?.cause || error.message,
			},
			data: null,
		};

		return throwError(() => new HttpException(errorResponse, statusCode));
	}

	private handleHttpException(e: HttpException, request: Request): Observable<never> {
		const statusCode = e.getStatus();

		const errorResponse: IResponse<null> = {
			statusCode,
			statusMessage: ResponseStatusMessagesEnum.ERROR,
			timestamp: new Date().toISOString(),
			version: this.getApiVersion(request),
			path: request.url,
			error: {
				message: e.message,
			},
			data: null,
		};

		return throwError(() => new HttpException(errorResponse, statusCode));
	}

	private handleUnexpectedError(error: Error, request: Request): Observable<never> {
		const errorResponse: IResponse<null> = {
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			statusMessage: ResponseStatusMessagesEnum.ERROR,
			timestamp: new Date().toISOString(),
			version: this.getApiVersion(request),
			path: request.url,
			error: {
				message: 'Internal server error',
			},
			data: null,
		};

		return throwError(() => new HttpException(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR));
	}

	private getApiVersion(request: Request): string {
		const versionFromPath = request.path.split('/')[1];
		return versionFromPath.startsWith('v') ? versionFromPath : 'v1';
	}
}
