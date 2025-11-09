import { NestFactory } from '@nestjs/core';
import { NestjsBoilerplateMobileModule } from './nestjs-boilerplate-mobile.module';

async function bootstrap() {
  const app = await NestFactory.create(NestjsBoilerplateMobileModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
