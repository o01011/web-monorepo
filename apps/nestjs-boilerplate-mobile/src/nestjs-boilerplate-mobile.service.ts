import { Injectable } from '@nestjs/common';

@Injectable()
export class NestjsBoilerplateMobileService {
  getHello(): string {
    return 'Hello World!';
  }
}
