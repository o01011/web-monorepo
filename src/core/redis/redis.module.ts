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
					port: configService.get<number>('REDIS_PORT'),
					host: configService.get<string>('REDIS_HOST'),
					db: configService.get<number>('REDIS_DATABASES'),
				},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [RedisService],
	exports: [RedisService],
})
export class RedisModule {}
