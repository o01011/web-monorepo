import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";
import { EnvironmentsEnum } from "../enums/environments.enum.js";
import { ConfigKeyEnum } from "../enums/config.enum.js";

type LoggerExpressionType = "incoming" | "error" | "success";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  private readonly isProduction: boolean;

  constructor(private readonly configService: ConfigService) {
    this.isProduction =
      this.configService.getOrThrow<string>(
        `${ConfigKeyEnum.ENVIRONMENT}.nodeEnv`,
      ) === EnvironmentsEnum.PRODUCTION;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (this.isProduction) return next.handle();

    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();

    const { method, originalUrl } = request;

    const start = Date.now();

    this.logResponse("incoming", method, originalUrl);

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - start;
          const { statusCode } = response;

          this.logResponse(
            "success",
            method,
            originalUrl,
            statusCode,
            duration,
          );
        },
        error: (e) => {
          const duration = Date.now() - start;
          const statusCode = response.statusCode;
          this.logResponse(
            "error",
            method,
            originalUrl,
            statusCode,
            duration,
            e,
          );
        },
      }),
    );
  }

  private logResponse(
    loggerExpressionType: LoggerExpressionType,
    method: string,
    url: string,
    statusCode?: number,
    duration?: number,
    error?: unknown,
  ): void {
    switch (loggerExpressionType) {
      case "incoming":
        this.logger.debug(`[Incoming] - [Method: ${method}] - [Url: ${url}]`);
        break;

      case "success":
        this.logger.debug(
          `[Completed] - [Method: ${method}] - [Url: ${url}] - [Status: ${statusCode}] - [Duration: ${duration}ms]`,
        );
        break;

      case "error":
        this.logger.error(
          `[Failed] - [Method: ${method}] - [Url: ${url}] - [Status: ${statusCode}] - [Duration: ${duration}ms] - [Error: ${error}]`,
        );
        break;
    }
  }
}
