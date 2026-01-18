import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseTransformationInterceptor } from '../common/interceptors/response-transformation.interceptor';
import { LoggingInterceptor } from '../common/interceptors/logger.interceptor';
import { TimeoutInterceptor } from '../common/interceptors/timeout.interceptor';
import { ConfigModule } from './config/config.module';
import { HealthChecksModule } from './health-checks/health-checks.module';
import { I18nModule } from './i18n/i18n.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';

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
