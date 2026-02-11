import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Prisma } from "../../../prisma/generated/client.ts";
import { type Response } from "express";
import { PrismaStatusCodesEnum } from "../enums/prisma-status-codes.enum.ts";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  override catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, "");

    switch (exception.code) {
      case PrismaStatusCodesEnum[HttpStatus.CONFLICT]: {
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }
      case PrismaStatusCodesEnum[HttpStatus.NOT_FOUND]: {
        const status = HttpStatus.NOT_FOUND;
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }
      default:
        super.catch(exception, host);
        break;
    }
  }
}
