import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { ConfigKeyEnum } from "../../common/enums/config.enum.ts";

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: Number(
            configService.getOrThrow<number>(`${ConfigKeyEnum.RATE_LIMIT}.ttl`),
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
})
export class RateLimitModule {}
