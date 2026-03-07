import { Module } from "@nestjs/common";
import { RedisModule as CoreRedisModule } from "@nestjs-modules/ioredis";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisService } from "./redis.service.js";
import { ConfigKeyEnum } from "../../common/enums/config.enum.js";

@Module({
  imports: [
    CoreRedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "single",
        url: configService.getOrThrow<string>(
          `${ConfigKeyEnum.CACHE}.redisUrl`,
        ),
        options: {
          keyPrefix: "nestjs-boilerplate-cache:",
        },
      }),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
