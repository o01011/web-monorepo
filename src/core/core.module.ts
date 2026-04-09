import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/config.module.js";
import { HealthChecksModule } from "./health-checks/health-checks.module.js";
import { JwtModule } from "./jwt/jwt.module.js";
import { PrismaModule } from "./prisma/prisma.module.js";
import { RateLimitModule } from "./rate-limit/rate-limit.module.js";
import { RedisModule } from "./redis/redis.module.js";
import { S3Module } from "./s3/s3.module.js";

@Module({
	imports: [ConfigModule, HealthChecksModule, JwtModule, PrismaModule, RateLimitModule, RedisModule, S3Module],
})
export class CoreModule {}
