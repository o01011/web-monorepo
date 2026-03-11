import { Logger, VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import { I18nValidationExceptionFilter, I18nValidationPipe } from "nestjs-i18n";
import { AppModule } from "./app.module.js";
import { ConfigKeyEnum } from "./common/enums/config.enum.js";
import { EnvironmentsEnum } from "./common/enums/environments.enum.js";
import { CatchEverythingFilter } from "./common/filters/catch-everything.filter.js";
import { LoggingInterceptor } from "./common/interceptors/logger.interceptor.js";
import { TimeoutInterceptor } from "./common/interceptors/timeout.interceptor.js";

const logger: Logger = new Logger("Bootstrap");

(async (): Promise<void> => {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const configService = app.get(ConfigService);
	const isProduction = configService.getOrThrow<string>(`${ConfigKeyEnum.ENVIRONMENT}.nodeEnv`) === EnvironmentsEnum.PRODUCTION;

	const appPort = configService.getOrThrow<number>(`${ConfigKeyEnum.APP}.appPort`);

	app.enableVersioning({
		defaultVersion: "1",
		prefix: "api/v",
		type: VersioningType.URI,
	});

	app.useGlobalPipes(
		new I18nValidationPipe({
			forbidNonWhitelisted: true,
			transform: true,
			whitelist: true,
		}),
	);

	if (!isProduction) {
		const swaggerPath: string = "/api/docs";
		const appName: string = configService.getOrThrow<string>("APP_NAME");
		const appDescription: string = configService.getOrThrow<string>(`${ConfigKeyEnum.APP}.appDescription`);

		const swaggerConfig = new DocumentBuilder()
			.setTitle(appName)
			.setDescription(appDescription)
			.setVersion("1.0")
			.addServer(`http://localhost:${appPort}`, "development")
			.addBearerAuth(
				{
					bearerFormat: "JWT",
					description: "Enter JWT token",
					in: "header",
					name: "Authorization",
					scheme: "bearer",
					type: "http",
				},
				"Bearer",
			)
			.addGlobalParameters({
				in: "header",
				name: "x-lang",
				required: false,
				schema: {
					example: "en",
				},
			})
			.addSecurityRequirements("Bearer")
			.build();

		const document = SwaggerModule.createDocument(app, swaggerConfig, {
			deepScanRoutes: true,
			ignoreGlobalPrefix: false,
			operationIdFactory: (methodKey: string) => methodKey,
		});

		SwaggerModule.setup(swaggerPath, app, document, {
			customSiteTitle: "Nestjs boilerplate",
			explorer: true,
			jsonDocumentUrl: `${swaggerPath}/json`,
			swaggerOptions: {
				filter: true,
				showRequestDuration: true,
			},
			yamlDocumentUrl: `${swaggerPath}/yaml`,
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
		allowedHeaders: "Content-Type, Authorization",
		credentials: true,
		methods: "GET,POST,PUT,DELETE",
		origin: "https://example.com",
	});

	app.use(helmet());

	app.enableShutdownHooks();

	app.useGlobalInterceptors(new TimeoutInterceptor(configService), new LoggingInterceptor(configService));

	await app.listen(appPort);

	logger.log(`Nestjs boilerplate admin application is running on: ${await app.getUrl()}`);

	if (!isProduction) logger.log(`Swagger docs available at: ${await app.getUrl()}`);
})().catch((e) => {
	logger.error(`Failed to start nestjs boilerplate admin application: ${e}`);
});
