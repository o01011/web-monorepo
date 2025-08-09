import { Module } from '@nestjs/common';
import { RedisModule } from '@core/redis/redis.module';
import { LoggerModule } from '@core/logger/logger.module';
import { HealthChecksModule } from '@core/health-checks/health-checks.module';
import { ConfigModule } from '@core/config/config.module';
import { MongoModule } from '@core/mongo/mongo.module';
import { KafkaModule } from './kafka/kafka.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
	LoggingInterceptor,
	ResponseTransformationInterceptor,
	TimeoutInterceptor,
} from '@common/interceptors';
import { PrismaModule } from './prisma/prisma.module';

@Module({
	imports: [
		ConfigModule,
		HealthChecksModule,
		LoggerModule,
		RedisModule,
		MongoModule,
		KafkaModule,
		PrismaModule,
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
