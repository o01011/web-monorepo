import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { seconds, ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ConfigKeyEnum } from "../../common/enums/config.enum.js";

@Module({
	imports: [
		ThrottlerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => [
				{
					limit: Number(configService.getOrThrow<number>(`${ConfigKeyEnum.RATE_LIMIT}.limit`)),
					name: "rate-limiter",
					ttl: seconds(Number(configService.getOrThrow<number>(`${ConfigKeyEnum.RATE_LIMIT}.ttl`))),
				},
			],
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
