import { ArgumentsHost, Catch, HttpStatus, Logger } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Prisma } from "../../../prisma/generated/client.ts";
import { type Response, Request } from "express";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(PrismaClientExceptionFilter.name);

  override catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let status: HttpStatus;
    let message: string;

    switch (exception.code) {
      case "P2002": {
        status = HttpStatus.CONFLICT;
        message = "Unique constraint failed on some field";
        break;
      }
      case "P2025": {
        status = HttpStatus.NOT_FOUND;
        message = "Record not found";
        break;
      }
      case "P2003": {
        status = HttpStatus.BAD_REQUEST;
        message = "Foreign key constraint failed";
        break;
      }
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = "Database error";
    }

    this.logger.error(`Prisma error: ${exception.code} - ${message}`);

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
