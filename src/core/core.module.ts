import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { RedisModule } from "./redis/redis.module.js";
import { PrismaModule } from "./prisma/prisma.module.js";
import { I18nModule } from "./i18n/i18n.module.js";
import { HealthChecksModule } from "./health-checks/health-checks.module.js";
import { ConfigModule } from "./config/config.module.js";
import { TimeoutInterceptor } from "../common/interceptors/timeout.interceptor.js";
import { LoggingInterceptor } from "../common/interceptors/logger.interceptor.js";
import { ResponseTransformationInterceptor } from "../common/interceptors/response-transformation.interceptor.js";

@Module({
  imports: [
    ConfigModule,
    HealthChecksModule,
    I18nModule,
    PrismaModule,
    RedisModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformationInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class CoreModule {}
