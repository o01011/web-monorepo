import { Module } from '@nestjs/common';
import { RedisService } from '@core/redis/redis.service';
import { RedisModule as CoreRedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		CoreRedisModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'single',
				options: {
					port: configService.getOrThrow<number>('REDIS_PORT'),
					host: configService.getOrThrow<string>('REDIS_HOST'),
					db: configService.getOrThrow<number>('REDIS_DATABASES'),
				},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [RedisService],
	exports: [RedisService],
})
export class RedisModule {}
