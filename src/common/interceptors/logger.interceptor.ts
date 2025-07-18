import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { ENVIROMENTS } from '@common/enums';
import { Request, Response } from 'express';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	constructor(
		private readonly configService: ConfigService,
		@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
	) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const httpContext = context.switchToHttp();
		const request = httpContext.getRequest<Request>();
		const response = httpContext.getResponse<Response>();

		const start = Date.now();

		const isProduction =
			this.configService.getOrThrow<string>('NODE_ENV') === ENVIROMENTS.PRODUCTION;

		const { method, originalUrl, headers, query, params, body } = request;
		console.log(request);

		if (!isProduction) {
			this.logger.debug(
				`[Request] ${method} ${originalUrl} Params: ${JSON.stringify(params, null, 2)} Query: ${JSON.stringify(query, null, 2)} Headers: ${JSON.stringify(headers, null, 2)} Body: ${JSON.stringify(body, null, 2)}`,
			);
		}

		return next.handle().pipe(
			tap({
				next: () => {
					const duration = Date.now() - start;
					const { statusCode } = response;
					if (!isProduction) {
						this.logger.debug(
							`[Response - Success] ${method} ${originalUrl} Status: ${statusCode} Time: ${duration}ms`,
						);
					}
				},
				error: err => {
					const duration = Date.now() - start;
					const statusCode = err.getStatus?.() || 500;
					if (!isProduction) {
						this.logger.error(
							`[Response - Error] ${method} ${originalUrl} Status: ${statusCode} Time: ${duration}ms Error: ${err.message}`,
						);
					}
				},
			}),
		);
	}
}
