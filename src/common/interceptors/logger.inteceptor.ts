import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { ENVIROMENTS } from '@common/enums';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	private readonly logger = new Logger();

	constructor(private readonly configService: ConfigService) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const httpContext = context.switchToHttp();
		const request = httpContext.getRequest<Request>();
		const response = httpContext.getResponse<Response>();

		const start = Date.now();

		const isProduction =
			this.configService.getOrThrow<string>('NODE_ENV') === ENVIROMENTS.PRODUCTION;

		const { method, originalUrl, headers, query, params, body } = request;

		if (!isProduction) {
			this.logger.log(
				`[Request] ${method} ${originalUrl}\n` +
					`Params: ${JSON.stringify(params, null, 2)}\n` +
					`Query: ${JSON.stringify(query, null, 2)}\n` +
					`Headers: ${JSON.stringify(headers, null, 2)}\n` +
					`Body: ${JSON.stringify(body, null, 2)}`,
			);
		}

		return next.handle().pipe(
			tap({
				next: () => {
					const duration = Date.now() - start;
					const { statusCode } = response;
					if (!isProduction) {
						this.logger.log(
							`[Response - Success] ${method} ${originalUrl}\n` +
								`Status: ${statusCode}\n` +
								`Time: ${duration}ms`,
						);
					}
				},
				error: err => {
					const duration = Date.now() - start;
					const statusCode = err.getStatus?.() || 500;
					if (!isProduction) {
						this.logger.error(
							`[Response - Error] ${method} ${originalUrl}\n` +
								`Status: ${statusCode}\n` +
								`Time: ${duration}ms\n` +
								`Error: ${err.message}`,
						);
					}
				},
			}),
		);
	}
}
