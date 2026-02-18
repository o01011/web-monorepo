import { Module } from "@nestjs/common";
import { ConfigModule as CoreConfigModule } from "@nestjs/config";
import Joi from "joi";
import { cacheRegister } from "../../common/registers/cache.register.ts";
import { appRegister } from "../../common/registers/app.register.ts";
import { dbRegister } from "../../common/registers/db.register.ts";
import { environmentRegister } from "../../common/registers/environment.register.ts";
import { i18nRegister } from "../../common/registers/i18n.register.ts";
import { jwtRegister } from "../../common/registers/jwt.register.ts";

@Module({
  imports: [
    CoreConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      load: [
        cacheRegister,
        appRegister,
        dbRegister,
        environmentRegister,
        i18nRegister,
        jwtRegister,
      ],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid("development", "production", "test")
          .default("development")
          .description("Application environment"),

        APP_PORT: Joi.number()
          .port()
          .default(3000)
          .description("Port on which the application will run"),
        APP_REQUEST_TIMEOUT: Joi.number()
          .positive()
          .default(5000)
          .description("Request timeout in milliseconds"),
        APP_NAME: Joi.string(),
        APP_DESCRIPTION: Joi.string(),
        APP_LOG_LEVEL: Joi.number().required().description("Logging level"),

        SWAGGER_USERNAME: Joi.string().description(
          "Swagger UI authentication username",
        ),
        SWAGGER_PASSWORD: Joi.string().description(
          "Swagger UI authentication password",
        ),

        POSTGRES_URL: Joi.string()
          .uri({ scheme: ["postgresql", "postgres"] })
          .required()
          .description("Postgres connection URL"),

        // KAFKA_PORT: Joi.number().port().default(19092).description('Kafka port'),
        // KAFKA_USER: Joi.string().required().description('Kafka username'),
        // KAFKA_PASSWORD: Joi.string().min(3).required().description('Kafka password'),
        // KAFKA_CFG_NODE_ID: Joi.string(),
        // KAFKA_CFG_PROCESS_ROLES: Joi.string(),
        // KAFKA_CFG_LISTENERS: Joi.string(),
        // KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP: Joi.string(),
        // KAFKA_CFG_CONTROLLER_QUORUM_VOTERS: Joi.string(),
        // KAFKA_CFG_CONTROLLER_LISTENER_NAMES: Joi.string(),

        REDIS_URL: Joi.string()
          .uri({ scheme: ["redis"] })
          .required()
          .description("Redis connection URL"),
      }).with("SWAGGER_USERNAME", "SWAGGER_PASSWORD"),
      // .with('KAFKA_USER', 'KAFKA_PASSWORD'
    }),
  ],
})
export class ConfigModule {}
