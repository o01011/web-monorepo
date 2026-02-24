import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import {
  Logger,
  ValidationPipe,
  ValidationPipeOptions,
  VersioningType,
} from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module.ts";
import { EnviromentEnum } from "./common/enums/enviroments.enum.ts";
import { PrismaClientExceptionFilter } from "./common/filters/prisma-client-exception.filter.ts";
import { ConfigKeyEnum } from "./common/enums/config.enum.ts";

const logger: Logger = new Logger("Bootstrap");

const swaggerSetup = (
  app: NestExpressApplication,
  configService: ConfigService,
  appPort: number,
): void => {
  const swaggerPath: string = "/api/docs";
  const appName: string = configService.get<string>("APP_NAME") ?? "";
  const appDescription: string =
    configService.get<string>(`${ConfigKeyEnum.APP}.appDescription`) ?? "";

  const swaggerConfig = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(appDescription)
    .setVersion("1.0")
    .addServer(`http://localhost:${appPort}`, "development")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        description: "Enter JWT token",
        in: "header",
      },
      "Bearer",
    )
    .addSecurityRequirements("Bearer")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    ignoreGlobalPrefix: false,
    deepScanRoutes: true,
  });

  SwaggerModule.setup(swaggerPath, app, document, {
    customSiteTitle: "Nestjs boilerplate",
    explorer: true,
    jsonDocumentUrl: `${swaggerPath}/json`,
    yamlDocumentUrl: `${swaggerPath}/yaml`,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
};

const versioningSetup = (app: NestExpressApplication): void => {
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
    prefix: "api/v",
  });
};

const validationPipeSetup = (app: NestExpressApplication): void => {
  const validationPipeConfig: ValidationPipeOptions = {
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  };

  app.useGlobalPipes(new ValidationPipe(validationPipeConfig));
};

const globalExceptionFiltersSetup = (app: NestExpressApplication): void => {
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
};

(async (): Promise<void> => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const isProduction =
    configService.get<string>(`${ConfigKeyEnum.ENVIRONMENT}.nodeEnv`) ===
    EnviromentEnum.PRODUCTION;

  const appPort =
    configService.get<number>(`${ConfigKeyEnum.APP}.appPort`) ?? 8000;

  versioningSetup(app);
  globalExceptionFiltersSetup(app);
  validationPipeSetup(app);

  if (!isProduction) swaggerSetup(app, configService, appPort);

  await app.listen(appPort);

  logger.log(
    `Nestjs boilerplate admin application is running on: ${await app.getUrl()}`,
  );

  if (!isProduction)
    logger.log(`Swagger docs available at: ${await app.getUrl()}`);
})().catch((e) => {
  logger.error(`Faild to start nestjs boilerplate admin application: ${e}`);
});
