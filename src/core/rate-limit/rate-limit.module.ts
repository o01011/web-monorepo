import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { seconds, ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ConfigKeysConst } from "../../common/constants/config-keys.const.js";
import { RateLimitType } from "../../common/types/rate-limiting.type.js";

@Module({
	imports: [
		ThrottlerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const rateLimitConfig = configService.getOrThrow<RateLimitType>(ConfigKeysConst.RATE_LIMIT);

				return [
					{
						limit: rateLimitConfig.limit,
						name: "rate-limiter",
						ttl: seconds(rateLimitConfig.ttl),
					},
				];
			},
		}),
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class RateLimitModule {}
