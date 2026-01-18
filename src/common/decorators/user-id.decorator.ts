import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const userId = request.headers['x-user-id'];

    if (!userId) throw new NotFoundException('x-user-id header missing');

    return userId;
  },
);

export function ApiUserIdHeader() {
  return applyDecorators(
    ApiHeader({
      name: 'x-user-id',
      description: 'User id (UUID format)',
      required: true,
      example: '550e8400-e29b-41d4-a716-446655440000',
    }),
  );
}
