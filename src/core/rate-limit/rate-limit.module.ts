import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule, seconds } from "@nestjs/throttler";
import { ConfigKeyEnum } from "../../common/enums/config.enum.js";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          name: "rate-limiter",
          ttl: seconds(
            Number(
              configService.getOrThrow<number>(
                `${ConfigKeyEnum.RATE_LIMIT}.ttl`,
              ),
            ),
          ),
          limit: Number(
            configService.getOrThrow<number>(
              `${ConfigKeyEnum.RATE_LIMIT}.limit`,
            ),
          ),
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
