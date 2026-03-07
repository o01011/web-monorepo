import { Module } from "@nestjs/common";
import { ConfigModule as CoreConfigModule } from "@nestjs/config";
import Joi from "joi";
import { cacheRegister } from "../../common/registers/cache.register.js";
import { appRegister } from "../../common/registers/app.register.js";
import { dbRegister } from "../../common/registers/db.register.js";
import { environmentRegister } from "../../common/registers/environment.register.js";
import { i18nRegister } from "../../common/registers/i18n.register.js";
import { jwtRegister } from "../../common/registers/jwt.register.js";
import { rateLimitRegister } from "../../common/registers/rate-limit.register.js";

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
        rateLimitRegister,
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

        POSTGRES_URL: Joi.string()
          .uri({ scheme: ["postgresql", "postgres"] })
          .required()
          .description("Postgres connection URL"),

        REDIS_URL: Joi.string()
          .uri({ scheme: ["redis"] })
          .required()
          .description("Redis connection URL"),

        I18N_FALLBACK_LANGUAGE: Joi.string()
          .required()
          .description("I18N fallback language"),

        JWT_SECRET: Joi.string().required().description("JWT secret"),
        JWT_EXPIRES_IN: Joi.number().required().description("JWT expires in"),

        THROTTLE_TTL: Joi.number().required().description("Rate limiting TTL"),
        THROTTLE_LIMIT: Joi.number()
          .required()
          .description("Rate limiting limit"),
      }),
    }),
  ],
})
export class ConfigModule {}
