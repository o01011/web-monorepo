import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthChecksModule } from './health-checks/health-checks.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from './config/config.module';
import { I18nModule } from './i18n/i18n.module';
import {
	LoggingInterceptor,
	ResponseTransformationInterceptor,
	TimeoutInterceptor,
} from '@libs/common/interceptors';

@Module({
	imports: [ConfigModule, HealthChecksModule, I18nModule, PrismaModule, RedisModule],
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
