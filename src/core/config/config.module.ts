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

				KAFKA_PORT: Joi.number().port().default(19092).description('Kafka port'),
				KAFKA_USER: Joi.string().required().description('Kafka username'),
				KAFKA_PASSWORD: Joi.string().min(3).required().description('Kafka password'),
				KAFKA_CFG_NODE_ID: Joi.string(),
				KAFKA_CFG_PROCESS_ROLES: Joi.string(),
				KAFKA_CFG_LISTENERS: Joi.string(),
				KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP: Joi.string(),
				KAFKA_CFG_CONTROLLER_QUORUM_VOTERS: Joi.string(),
				KAFKA_CFG_CONTROLLER_LISTENER_NAMES: Joi.string(),

				KAFKA_UI_PORT: Joi.number().port().default(8080).description('Kafka UI port'),
				KAFKA_CLUSTERS_0_NAME: Joi.string().default('local').description('Kafka cluster name'),
				KAFKA_CLUSTERS_0_PROPERTIES_SECURITY_PROTOCOL: Joi.string()
					.default('SASL_PLAINTEXT')
					.description('Kafka cluster security protocol'),
				KAFKA_CLUSTERS_0_PROPERTIES_SASL_MECHANISM: Joi.string()
					.default('SCRAM-SHA-512')
					.description('Kafka cluster SASL mechanism'),

				REDIS_HOST: Joi.string(),
				REDIS_PORT: Joi.number().port().default(6379).description('Redis port'),

				RI_PORT: Joi.number().port().default(5540).description('Redis Insight port'),
				RI_DISABLE_ENCRYPTION: Joi.number()
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
	],
})
export class ConfigModule {}
