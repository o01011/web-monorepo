import { NestFactory } from '@nestjs/core';
import {
  Logger,
  ValidationPipe,
  ValidationPipeOptions,
  VersioningType,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import expressBasicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnviromentEnum } from './common/enums/enviroments.enum';
import { AppModule } from './app.module';

const logger: Logger = new Logger('Bootstrap');

function swaggerSetup(
  app: NestExpressApplication,
  configService: ConfigService,
  appPort: number,
): void {
  const swaggerPath: string = '/api/docs';
  const swaggerUsername: string =
    configService.get<string>('SWAGGER_USERNAME') ?? '';
  const swaggerPassword: string =
    configService.get<string>('SWAGGER_PASSWORD') ?? '';
  const appName: string = configService.get<string>('APP_NAME') ?? '';
  const appDescription: string =
    configService.get<string>('APP_DESCRIPTION') ?? '';

  app.use(
    [swaggerPath, `${swaggerPath}-json`, `${swaggerPath}-yaml`],
    expressBasicAuth({
      challenge: true,
      users: {
        [swaggerUsername]: swaggerPassword,
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(appDescription)
    .setVersion('1.0')
    .addServer(`http://localhost:${appPort}`, 'development')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    ignoreGlobalPrefix: false,
    deepScanRoutes: true,
  });

  SwaggerModule.setup(swaggerPath, app, document, {
    customSiteTitle: 'Nestjs boilerplate',
    explorer: true,
    jsonDocumentUrl: `${swaggerPath}/json`,
    yamlDocumentUrl: `${swaggerPath}/yaml`,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
      persistAuthorization: true,
    },
  });
}

function versioningSetup(app: NestExpressApplication): void {
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'api/v',
  });
}

function validationPipeSetup(app: NestExpressApplication): void {
  const validationPipeConfig: ValidationPipeOptions = {
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  };

  app.useGlobalPipes(new ValidationPipe(validationPipeConfig));
}

(async (): Promise<void> => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const isProduction =
    configService.get<string>('NODE_ENV') === EnviromentEnum.Production;

  const appPost = configService.get<number>('APP_PORT') ?? 8000;

  versioningSetup(app);

  if (!isProduction) swaggerSetup(app, configService, appPost);

  validationPipeSetup(app);

  await app.listen(appPost);

  logger.log(
    `Nestjs boilerplate admin application is running on: ${await app.getUrl()}`,
  );

  if (!isProduction)
    logger.log(`Swagger docs available at: ${await app.getUrl()}`);
})().catch((e) => {
  logger.error(`Faild to start nestjs boilerplate admin application: ${e}`);
});
