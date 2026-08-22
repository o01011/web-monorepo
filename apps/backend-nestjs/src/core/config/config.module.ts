import { Module } from "@nestjs/common";
import { ConfigModule as CoreConfigModule } from "@nestjs/config";
import Joi from "joi";
import { appRegister } from "../../common/registers/app.register.js";
import { environmentRegister } from "../../common/registers/environment.register.js";
import { jwtRegister } from "../../common/registers/jwt.register.js";
import { prismaRegister } from "../../common/registers/prisma.register.js";
import { rateLimitRegister } from "../../common/registers/rate-limit.register.js";
import { redisRegister } from "../../common/registers/redis.register.js";
import { s3Register } from "../../common/registers/s3.register.js";

@Module({
	imports: [
		CoreConfigModule.forRoot({
			envFilePath: [".env", "../../.env"],
			isGlobal: true,
			load: [redisRegister, appRegister, prismaRegister, environmentRegister, jwtRegister, rateLimitRegister, s3Register],
			validationSchema: Joi.object({
				APP_DESCRIPTION: Joi.string(),
				APP_LOG_LEVEL: Joi.number().required().description("Logging level"),
				APP_NAME: Joi.string(),

				APP_PORT: Joi.number().port().default(3000).description("Port on which the application will run"),
				APP_REQUEST_TIMEOUT: Joi.number().positive().default(5000).description("Request timeout in milliseconds"),
				AWS_ACCESS_KEY_ID: Joi.string().required(),

				AWS_REGION: Joi.string().required(),
				AWS_S3_BUCKET_NAME: Joi.string().required(),
				AWS_SECRET_ACCESS_KEY: Joi.string().required(),

				JWT_EXPIRES_IN: Joi.number().required().description("JWT expires in"),
				JWT_SECRET: Joi.string().required().description("JWT secret"),

				NODE_ENV: Joi.string().valid("development", "production", "test").default("development").description("Application environment"),

				POSTGRES_URL: Joi.string()
					.uri({ scheme: ["postgresql", "postgres"] })
					.required()
					.description("Postgres connection URL"),

				REDIS_URL: Joi.string()
					.uri({ scheme: ["redis"] })
					.required()
					.description("Redis connection URL"),
				THROTTLE_LIMIT: Joi.number().required().description("Rate limiting limit"),

				THROTTLE_TTL: Joi.number().required().description("Rate limiting TTL"),
			}),
		}),
	],
})
export class ConfigModule {}
