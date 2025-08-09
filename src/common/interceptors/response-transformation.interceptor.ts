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
			}),
		);
	}

	private handlePrismaErrorResponse(
		e: Prisma.PrismaClientKnownRequestError,
		request: Request,
	): Observable<never> {
		const statusCode = PrismaStatusCodesEnum[e.code] || HttpStatus.INTERNAL_SERVER_ERROR;

		const errorResponse: IResponse<null> = {
			statusCode,
			statusMessage: ResponseStatusMessagesEnum.ERROR,
			timestamp: new Date().toISOString(),
			version: this.getApiVersion(request),
			path: request.url,
			error: {
				message: e.meta?.cause,
			},
			data: null,
		};

		return throwError(() => new HttpException(errorResponse, statusCode));
	}

	private getApiVersion(request: Request): string {
		const versionFromPath = request.path.split('/')[1];
		return versionFromPath.startsWith('v') ? versionFromPath : 'v1';
	}
}
