import { Module } from "@nestjs/common";
import { ConfigModule } from "./core/config/config.module.js";
import { HealthChecksModule } from "./core/health-checks/health-checks.module.js";
import { JwtModule } from "./core/jwt/jwt.module.js";
import { PrismaModule } from "./core/prisma/prisma.module.js";
import { RateLimitModule } from "./core/rate-limit/rate-limit.module.js";
import { RedisModule } from "./core/redis/redis.module.js";
import { S3Module } from "./core/s3/s3.module.js";
import { AuthModule } from "./modules/auth/auth.module.js";
import { PostModule } from "./modules/post/post.module.js";

@Module({
	imports: [ConfigModule, HealthChecksModule, JwtModule, PrismaModule, RateLimitModule, RedisModule, S3Module, PostModule, AuthModule],
})
export class AppModule {}
