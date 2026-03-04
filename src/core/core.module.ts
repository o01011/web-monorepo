import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { RedisModule } from "./redis/redis.module.ts";
import { PrismaModule } from "./prisma/prisma.module.ts";
import { I18nModule } from "./i18n/i18n.module.ts";
import { HealthChecksModule } from "./health-checks/health-checks.module.ts";
import { ConfigModule } from "./config/config.module.ts";
import { TimeoutInterceptor } from "../common/interceptors/timeout.interceptor.ts";
import { LoggingInterceptor } from "../common/interceptors/logger.interceptor.ts";
import { JwtModule } from "./jwt/jwt.module.ts";
import { RateLimitModule } from "./rate-limit/rate-limit.module.ts";

@Module({
  imports: [
    ConfigModule,
    HealthChecksModule,
    I18nModule,
    PrismaModule,
    RedisModule,
    JwtModule,
    RateLimitModule,
  ],
  providers: [
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
