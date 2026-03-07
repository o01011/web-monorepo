import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import type {
  ErrorResponseBody,
  HttpExceptionResponse,
} from "../types/error-response.type.js";
import { ConfigKeyEnum } from "../enums/config.enum.js";
import { EnvironmentsEnum } from "../enums/environments.enum.js";
import { Prisma } from "@prisma/generated/client.js";

const PRISMA_ERROR_MAP: Record<string, HttpStatus> = {
  P2000: HttpStatus.BAD_REQUEST,
  P2001: HttpStatus.NOT_FOUND,
  P2002: HttpStatus.CONFLICT,
  P2003: HttpStatus.BAD_REQUEST,
  P2014: HttpStatus.BAD_REQUEST,
  P2025: HttpStatus.NOT_FOUND,
} as const;

const INTERNAL_ERROR_MESSAGE = "Internal server error";
const INTERNAL_ERROR_TYPE = "InternalServerErrorException";

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  private readonly logger = new Logger(CatchEverythingFilter.name);

  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly configService: ConfigService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    const { statusCode, error, message } = this.normalizeException(exception);

    const responseBody: ErrorResponseBody = {
      statusCode,
      error,
      message,
      path: httpAdapter.getRequestUrl(request),
      timestamp: new Date().toISOString(),
    };

    if (statusCode >= 500) {
      this.logger.error(
        `Unhandled ${statusCode} error: ${String(exception)}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }

  private normalizeException(exception: unknown): {
    statusCode: number;
    error: string;
    message: string | string[];
  } {
    if (exception instanceof HttpException) {
      return this.normalizeHttpException(exception);
    }

    if (this.isPrismaKnownRequestError(exception)) {
      return this.normalizePrismaKnownRequestError(exception);
    }

    if (this.isPrismaValidationError(exception)) {
      return this.normalizePrismaValidationError(exception);
    }

    return this.normalizeUnknownError(exception);
  }

  private normalizeHttpException(exception: HttpException): {
    statusCode: number;
    error: string;
    message: string | string[];
  } {
    const statusCode = exception.getStatus();
    const response = exception.getResponse() as HttpExceptionResponse;

    if (typeof response === "string") {
      return {
        statusCode,
        error: exception.name,
        message: response,
      };
    }

    const message = response?.message ?? exception.message;
    const error = response?.error ?? exception.name;

    return {
      statusCode: response?.statusCode ?? statusCode,
      error: typeof error === "string" ? error : "Error",
      message: Array.isArray(message)
        ? message
        : String(message ?? INTERNAL_ERROR_MESSAGE),
    };
  }

  private normalizePrismaKnownRequestError(
    error: Prisma.PrismaClientKnownRequestError,
  ): {
    statusCode: number;
    error: string;
    message: string | string[];
  } {
    const statusCode =
      PRISMA_ERROR_MAP[error.code] ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const message = this.getPrismaErrorMessage(error);

    return {
      statusCode,
      error: "PrismaClientKnownRequestError",
      message,
    };
  }

  private normalizePrismaValidationError(
    error: Prisma.PrismaClientValidationError,
  ): {
    statusCode: number;
    error: string;
    message: string | string[];
  } {
    const isProduction = this.isProduction();
    const message = isProduction ? "Validation failed" : error.message;

    return {
      statusCode: HttpStatus.BAD_REQUEST,
      error: "PrismaClientValidationError",
      message,
    };
  }

  private normalizeUnknownError(exception: unknown): {
    statusCode: number;
    error: string;
    message: string | string[];
  } {
    const isProduction = this.isProduction();

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: INTERNAL_ERROR_TYPE,
      message: isProduction
        ? INTERNAL_ERROR_MESSAGE
        : exception instanceof Error
          ? exception.message
          : String(exception),
    };
  }

  private getPrismaErrorMessage(
    error: Prisma.PrismaClientKnownRequestError,
  ): string {
    if (error.code === "P2002") {
      const target = (error.meta?.["target"] as string[] | undefined)?.[0];
      return target
        ? `Unique constraint failed on field: ${target}`
        : error.message;
    }
    if (error.code === "P2025") {
      const modelName = error.meta?.["modelName"];
      return modelName
        ? `${String(modelName)} record not found`
        : "Record not found";
    }
    return error.message;
  }

  private isProduction(): boolean {
    return (
      this.configService.get<string>(`${ConfigKeyEnum.ENVIRONMENT}.nodeEnv`) ===
      EnvironmentsEnum.PRODUCTION
    );
  }

  private isPrismaKnownRequestError(
    exception: unknown,
  ): exception is Prisma.PrismaClientKnownRequestError {
    return (
      typeof exception === "object" &&
      exception !== null &&
      "code" in exception &&
      typeof (exception as Prisma.PrismaClientKnownRequestError).code ===
        "string" &&
      (exception as Prisma.PrismaClientKnownRequestError).code.startsWith("P")
    );
  }

  private isPrismaValidationError(
    exception: unknown,
  ): exception is Prisma.PrismaClientValidationError {
    return (
      exception instanceof Error &&
      exception.constructor.name === "PrismaClientValidationError"
    );
  }
}
