import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { Logger, VersioningType } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module.js";
import { EnvironmentsEnum } from "./common/enums/environments.enum.js";
import { ConfigKeyEnum } from "./common/enums/config.enum.js";
import helmet from "helmet";
import { I18nValidationExceptionFilter, I18nValidationPipe } from "nestjs-i18n";
import { TimeoutInterceptor } from "./common/interceptors/timeout.interceptor.js";
import { LoggingInterceptor } from "./common/interceptors/logger.interceptor.js";
import { CatchEverythingFilter } from "./common/filters/catch-everything.filter.js";

const logger: Logger = new Logger("Bootstrap");

(async (): Promise<void> => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const isProduction =
    configService.getOrThrow<string>(`${ConfigKeyEnum.ENVIRONMENT}.nodeEnv`) ===
    EnvironmentsEnum.PRODUCTION;

  const appPort = configService.getOrThrow<number>(
    `${ConfigKeyEnum.APP}.appPort`,
  );

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
    prefix: "api/v",
  });

  app.useGlobalPipes(
    new I18nValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  if (!isProduction) {
    const swaggerPath: string = "/api/docs";
    const appName: string = configService.getOrThrow<string>("APP_NAME");
    const appDescription: string = configService.getOrThrow<string>(
      `${ConfigKeyEnum.APP}.appDescription`,
    );

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
      .addGlobalParameters({
        in: "header",
        required: false,
        name: "x-lang",
        schema: {
          example: "en",
        },
      })
      .addSecurityRequirements("Bearer")
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig, {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
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
  }

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
    new CatchEverythingFilter(httpAdapterHost, configService),
  );

  app.enableCors({
    origin: "https://example.com",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  });

  app.use(helmet());

  app.enableShutdownHooks();

  app.useGlobalInterceptors(
    new TimeoutInterceptor(configService),
    new LoggingInterceptor(configService),
  );

  await app.listen(appPort);

  logger.log(
    `Nestjs boilerplate admin application is running on: ${await app.getUrl()}`,
  );

  if (!isProduction)
    logger.log(`Swagger docs available at: ${await app.getUrl()}`);
})().catch((e) => {
  logger.error(`Failed to start nestjs boilerplate admin application: ${e}`);
});
