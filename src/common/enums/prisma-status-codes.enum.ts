import { HttpStatus } from '@nestjs/common';

export enum PrismaStatusCodesEnum {
  'P2002' = HttpStatus.CONFLICT,
  'P2025' = HttpStatus.NOT_FOUND,
}
