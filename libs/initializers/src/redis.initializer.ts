import { DynamicModule } from '@nestjs/common';
import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const RedisInitializer = (): DynamicModule => {
	return RedisModule.forRootAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: (configService: ConfigService): RedisModuleOptions => ({
			type: 'single',
			url: configService.get<string>('REDIS_URL'),
			options: {
				keyPrefix: 'nestjs-boilerplate',
			},
		}),
	});
};
