import { Controller, Get } from '@nestjs/common';
import { NestjsBoilerplateMobileService } from './nestjs-boilerplate-mobile.service';

@Controller()
export class NestjsBoilerplateMobileController {
  constructor(private readonly nestjsBoilerplateMobileService: NestjsBoilerplateMobileService) {}

  @Get()
  getHello(): string {
    return this.nestjsBoilerplateMobileService.getHello();
  }
}
