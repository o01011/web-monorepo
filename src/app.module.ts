import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { transports, format } from 'winston';
import 'winston-daily-rotate-file';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			validationSchema: Joi.object({
				NODE_ENV: Joi.string()
					.valid('development', 'production')
					.default('development')
					.description('Application enviroment'),

				APP_PORT: Joi.number()
					.port()
					.default(3000)
					.description('Port on which the application will run'),
				APP_REQUEST_TIMEOUT: Joi.number()
					.positive()
					.default(5000)
					.description('Request timeout in milliseconds'),

				SWAGGER_USERNAME: Joi.string()
					.min(3)
					.default('admin')
					.description('Swagger UI authentication username'),
				SWAGGER_PASSWORD: Joi.string()
					.min(3)
					.default('admin')
					.description('Swagger UI authentication password'),

				POSTGRES_HOST: Joi.string()
					.hostname()
					.default('localhost')
					.description('PostgreSQL database host'),
				POSTGRES_PORT: Joi.number().port().default(5432).description('PostgreSQL database port'),
				POSTGRES_USER: Joi.string().required().description('PostgreSQL database username'),
				POSTGRES_PASSWORD: Joi.string().required().description('POstgreSQL database password'),
				POSTGRES_DB: Joi.string().required().description('PostgresSQL database name'),
				POSTGRES_URL: Joi.string()
					.uri({
						scheme: ['postgresql', 'postgres'],
					})
					.required()
					.description('PostgresSQL connection URL'),

				KAFKA_USER: Joi.string().required().description('Kafka username'),
				KAFKA_PASSWORD: Joi.string().min(3).required().description('Kafka password'),

				REDIS_PASSWORD: Joi.string().min(3).required().description('Redis port'),
				REDIS_PORT: Joi.number().port().default(6379).description('Redis port'),

				RI_PORT: Joi.number().port().default(8001).description('Redis Insight port'),

				PROMETHEUS_PORT: Joi.number().port().default(9090).description('Prometheus port'),
				GRAFANA_PORT: Joi.number().port().default(3000).description('Grafana port'),
				GRAFANA_ADMIN_USER: Joi.string().default('admin').description('Grafana admin username'),
				GRAFANA_ADMIN_PASSWORD: Joi.string()
					.min(3)
					.default('admin')
					.description('Grafana admin password'),
				GRAFANA_DOMAIN: Joi.string()
					.uri()
					.default('localhost')
					.description('Grafana domain')
					.allow('localhost', 'nestjs-boilerplate-grafana'),
			})
				.with('POSTGRES_USER', 'POSTGRES_PASSWORD')
				.with('SWAGGER_USERNAME', 'SWAGGER_PASSWORD')
				.with('KAFKA_USER', 'KAFKA_PASSWORD'),
		}),
		WinstonModule.forRoot({
			transports: [
				new transports.Console({
					format: format.combine(
						format.timestamp(),
						format.ms(),
						nestWinstonModuleUtilities.format.nestLike('nestjs-boilerplate', {
							colors: true,
							prettyPrint: true,
							processId: true,
							appName: true,
						}),
					),
				}),
				new transports.DailyRotateFile({
					filename: 'logs/application-%DATE%.log',
					datePattern: 'YYYY-MM-DD',
					zippedArchive: true,
					maxSize: '20m',
					maxFiles: '14d',
					format: format.combine(format.timestamp(), format.json()),
				}),
			],
		}),
	],
})
export class AppModule {}
