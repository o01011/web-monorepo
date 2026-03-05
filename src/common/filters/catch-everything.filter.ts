import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpErrorType =
      exception instanceof HttpException
        ? exception.name
        : "InternalServerExsception";

    const httpErrorMessage =
      exception instanceof HttpException
        ? exception.message
        : "Internal server error";

    const httpStatusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      type: httpErrorType,
      message: httpErrorMessage,
      code: httpStatusCode,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatusCode);
  }
}
