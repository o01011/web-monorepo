import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { RedisModule } from "./redis/redis.module.ts";
import { PrismaModule } from "./prisma/prisma.module.ts";
import { I18nModule } from "./i18n/i18n.module.ts";
import { HealthChecksModule } from "./health-checks/health-checks.module.ts";
import { ConfigModule } from "./config/config.module.ts";
import { CatchEverythingFilter } from "../common/filters/catch-everything.filter.ts";
import { JwtModule } from "./jwt/jwt.module.ts";
import { RateLimitModule } from "./rate-limit/rate-limit.module.ts";

@Module({
  imports: [
    ConfigModule,
    HealthChecksModule,
    I18nModule,
    JwtModule,
    PrismaModule,
    RateLimitModule,
    RedisModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
  ],
})
export class CoreModule {}
