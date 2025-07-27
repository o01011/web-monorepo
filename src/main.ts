import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, ValidationPipeOptions, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import expressBasicAuth from 'express-basic-auth';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ENVIROMENTS } from '@common/enums';

const logger = new Logger('Bootstrap');

function setupLogger(app: NestExpressApplication): void {
	app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
}

function swaggerSetup(
	app: NestExpressApplication,
	configService: ConfigService,
	appPort: number,
): void {
	const swaggerPath = '/api/docs';
	const swaggerUsername = configService.get<string>('SWAGGER_USERNAME');
	const swaggerPassword = configService.get<string>('SWAGGER_PASSWORD');
	const appName = configService.get<string>('APP_NAME');
	const appDescription = configService.get<string>('APP_DESCRIPTION');

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
		validateCustomDecorators: true,
		transformOptions: {
			enableImplicitConversion: true,
			excludeExtraneousValues: true,
		},
	};

	app.useGlobalPipes(new ValidationPipe(validationPipeConfig));
}

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const configService = app.get(ConfigService);
	const isProduction = configService.get<string>('NODE_ENV') === ENVIROMENTS.PRODUCTION;

	const appPort = configService.get<number>('APP_PORT');

	versioningSetup(app);

	if (!isProduction) swaggerSetup(app, configService, appPort);

	validationPipeSetup(app);
	setupLogger(app);

	await app.listen(appPort);

	logger.log(`Nestjs boilerplate is running on: ${await app.getUrl()}`);

	if (!isProduction) logger.log(`Swagger docs available at: ${await app.getUrl()}/api/docs`);
}

bootstrap().catch(e => {
	logger.error(`Faild to start application: ${e}`);
	process.exit(1);
});
