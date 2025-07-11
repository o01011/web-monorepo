import { Module } from '@nestjs/common';
import { RedisModule } from '@core/redis/redis.module';
import { PrismaModule } from '@core/prisma/prisma.module';
import { LoggerModule } from '@core/logger/logger.module';
import { HealthChecksModule } from '@core/health-checks/health-checks.module';
import { ConfigModule } from '@core/config/config.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import {
	LoggingInterceptor,
	ResponseTransformationInterceptor,
	TimeoutInterceptor,
} from '@common/interceptors';
import { MongoModule } from '@core/mongo/mongo.module';
import { CatchEverythingFilter, HttpExceptionFilter } from '@common/filters';

@Module({
	imports: [ConfigModule, HealthChecksModule, LoggerModule, PrismaModule, RedisModule, MongoModule],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggingInterceptor,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: TimeoutInterceptor,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseTransformationInterceptor,
		},
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
		{
			provide: APP_FILTER,
			useClass: CatchEverythingFilter,
		},
	],
})
export class CoreModule {}
