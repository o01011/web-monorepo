import { Module } from '@nestjs/common';
import { NestjsBoilerplateMobileController } from './nestjs-boilerplate-mobile.controller';
import { NestjsBoilerplateMobileService } from './nestjs-boilerplate-mobile.service';

@Module({
  imports: [],
  controllers: [NestjsBoilerplateMobileController],
  providers: [NestjsBoilerplateMobileService],
})
export class NestjsBoilerplateMobileModule {}
