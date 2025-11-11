import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { EnviromentEnum } from '../enums';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	private readonly logger = new Logger(LoggingInterceptor.name);
	private readonly className = LoggingInterceptor.name;
	private readonly isProduction: boolean;

	constructor(private readonly configService: ConfigService) {
		this.isProduction = this.configService.get<string>('NODE_ENV') === EnviromentEnum.Production;
	}

	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		if (this.isProduction) return next.handle();

		const httpContext = context.switchToHttp();
		const request = httpContext.getRequest<Request>();
		const response = httpContext.getResponse<Response>();

		const start = Date.now();
		const { method, originalUrl, headers, query, params, body } = request;

		this.logRequestDetails(method, originalUrl, { params, query, headers, body });

		return next.handle().pipe(
			tap({
				next: () => {
					const duration = Date.now() - start;
					const { statusCode } = response;
					this.logResponseSuccess(method, originalUrl, statusCode, duration);
				},
				error: e => {
					const duration = Date.now() - start;
					const statusCode = response.statusCode;
					this.logResponseError(method, originalUrl, statusCode, duration, e);
				},
			}),
		);
	}

	private logRequestDetails(
		method: string,
		url: string,
		details: { params: unknown; query: unknown; headers: unknown; body: unknown },
	): void {
		this.logger.debug(`[${this.className}] Incoming Request`, {
			method,
			url,
			params: details.params,
			query: details.query,
			headers: details.headers,
			body: details.body,
		});
	}

	private logResponseSuccess(
		method: string,
		url: string,
		statusCode: number,
		duration: number,
	): void {
		this.logger.debug(`[${this.className}] Request Completed`, {
			method,
			url,
			statusCode,
			duration: `${duration}ms`,
		});
	}

	private logResponseError(
		method: string,
		url: string,
		statusCode: number,
		duration: number,
		e: {
			name: string;
			message: string;
			details?: string | null;
		} | null,
	): void {
		this.logger.error(`[${this.className}] Request Failed`, {
			method,
			url,
			statusCode,
			duration: `${duration}ms`,
			error: e,
		});
	}
}
