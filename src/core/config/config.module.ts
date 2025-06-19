import { Module } from '@nestjs/common';
import Joi from 'joi';
import { ConfigModule as CoreConfigModule } from '@nestjs/config';

@Module({
	imports: [
		CoreConfigModule.forRoot({
			isGlobal: true,
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
				APP_NAME: Joi.string(),
				APP_DESCRIPTION: Joi.string(),

				SWAGGER_USERNAME: Joi.string()
					.min(3)
					.default('admin')
					.description('Swagger UI authentication username'),
				SWAGGER_PASSWORD: Joi.string()
					.min(3)
					.default('admin')
					.description('Swagger UI authentication password'),

				POSTGRES_URL: Joi.string()
					.uri({ scheme: ['postgresql', 'postgres'] })
					.required()
					.description('PostgreSQL connection URL'),

				// KAFKA_PORT: Joi.number().port().default(19092).description('Kafka port'),
				// KAFKA_USER: Joi.string().required().description('Kafka username'),
				// KAFKA_PASSWORD: Joi.string().min(3).required().description('Kafka password'),
				// KAFKA_CFG_NODE_ID: Joi.string(),
				// KAFKA_CFG_PROCESS_ROLES: Joi.string(),
				// KAFKA_CFG_LISTENERS: Joi.string(),
				// KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP: Joi.string(),
				// KAFKA_CFG_CONTROLLER_QUORUM_VOTERS: Joi.string(),
				// KAFKA_CFG_CONTROLLER_LISTENER_NAMES: Joi.string(),

				REDIS_HOST: Joi.string(),
				REDIS_PORT: Joi.number().port().default(6379).description('Redis port'),
			}).with('SWAGGER_USERNAME', 'SWAGGER_PASSWORD'),
			// .with('KAFKA_USER', 'KAFKA_PASSWORD')
		}),
	],
})
export class ConfigModule {}
