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
			cache: true,
			envFilePath: '.env',
			validationSchema: Joi.object({
				NODE_ENV: Joi.string()
					.valid('development', 'production', 'test')
					.default('development')
					.description('Application environment'),

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
				POSTGRES_PASSWORD: Joi.string().required().description('PostgreSQL database password'),
				POSTGRES_DB: Joi.string().required().description('PostgreSQL database name'),
				POSTGRES_URL: Joi.string()
					.uri({ scheme: ['postgresql', 'postgres'] })
					.required()
					.description('PostgreSQL connection URL'),

				ZOOKEEPER_CLIENT_PORT: Joi.number()
					.port()
					.default(2181)
					.description('Zookeeper client port'),
				ZOOKEEPER_TICK_TIME: Joi.number()
					.positive()
					.default(2000)
					.description('Zookeeper tick time in milliseconds'),

				KAFKA_PORT: Joi.number().port().default(19092).description('Kafka port'),
				KAFKA_USER: Joi.string().required().description('Kafka username'),
				KAFKA_PASSWORD: Joi.string().min(3).required().description('Kafka password'),
				KAFKA_BROKER_ID: Joi.number().positive().default(1).description('Kafka broker ID'),
				KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: Joi.string()
					.default('PLAINTEXT:PLAINTEXT,PLAINTEXT_INTERNAL:PLAINTEXT')
					.description('Kafka listener security protocol map'),
				KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: Joi.number()
					.positive()
					.default(1)
					.description('Kafka offsets topic replication factor'),

				KAFKA_UI_PORT: Joi.number().port().default(8080).description('Kafka UI port'),
				KAFKA_CLUSTERS_0_NAME: Joi.string().default('local').description('Kafka cluster name'),
				KAFKA_CLUSTERS_0_PROPERTIES_SECURITY_PROTOCOL: Joi.string()
					.default('SASL_PLAINTEXT')
					.description('Kafka cluster security protocol'),
				KAFKA_CLUSTERS_0_PROPERTIES_SASL_MECHANISM: Joi.string()
					.default('SCRAM-SHA-512')
					.description('Kafka cluster SASL mechanism'),

				REDIS_PASSWORD: Joi.string().min(3).required().description('Redis password'),
				REDIS_PORT: Joi.number().port().default(6379).description('Redis port'),

				REDISINSIGHT_PORT: Joi.number().port().default(5540).description('Redis Insight port'),
				REDISINSIGHT_DISABLE_ENCRYPTION: Joi.number()
					.valid(0, 1)
					.default(1)
					.description('Redis Insight encryption flag'),

				PROMETHEUS_PORT: Joi.number().port().default(9090).description('Prometheus port'),

				GF_SECURITY_ADMIN_USER: Joi.string().default('admin').description('Grafana admin username'),
				GF_SECURITY_ADMIN_PASSWORD: Joi.string()
					.min(3)
					.default('admin')
					.description('Grafana admin password'),
				GF_USERS_ALLOW_SIGN_UP: Joi.boolean()
					.default(false)
					.description('Grafana allow user signup'),
				GF_AUTH_DISABLE_LOGIN_FORM: Joi.boolean()
					.default(false)
					.description('Grafana disable login form'),
				GF_AUTH_ANONYMOUS_ENABLED: Joi.boolean()
					.default(false)
					.description('Grafana anonymous access'),
				GF_SERVER_ROOT_URL: Joi.string()
					.default('%(protocol)s://%(domain)s:%(http_port)s/')
					.description('Grafana server root URL'),
				GF_SERVER_DOMAIN: Joi.string()
					.default('nestjs-boilerplate-grafana')
					.description('Grafana server domain'),
				GF_PORT: Joi.number().port().default(3000).description('Grafana port'),
			})
				.with('POSTGRES_USER', ['POSTGRES_PASSWORD', 'POSTGRES_DB'])
				.with('SWAGGER_USERNAME', 'SWAGGER_PASSWORD')
				.with('KAFKA_USER', 'KAFKA_PASSWORD')
				.with('GF_SECURITY_ADMIN_USER', 'GF_SECURITY_ADMIN_PASSWORD'),
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
