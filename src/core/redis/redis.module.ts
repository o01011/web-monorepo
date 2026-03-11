import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisModule as CoreRedisModule } from "@nestjs-modules/ioredis";
import { ConfigKeyEnum } from "../../common/enums/config.enum.js";
import { RedisService } from "./redis.service.js";

@Module({
	exports: [RedisService],
	imports: [
		CoreRedisModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				options: {
					keyPrefix: "nestjs-boilerplate-cache:",
				},
				type: "single",
				url: configService.getOrThrow<string>(`${ConfigKeyEnum.CACHE}.redisUrl`),
			}),
		}),
	],
	providers: [RedisService],
})
export class RedisModule {}
