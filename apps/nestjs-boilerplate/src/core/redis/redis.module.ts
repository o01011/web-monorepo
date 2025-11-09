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
				url: configService.get<string>('REDIS_URL'),
				options: {
					keyPrefix: 'nestjs-boilerplate-cache:',
				},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [RedisService],
	exports: [RedisService],
})
export class RedisModule {}
