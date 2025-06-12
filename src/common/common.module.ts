import { Module } from '@nestjs/common';
import { ConfigModule } from '@common/config/config.module';
import { HealthChecksModule } from '@common/health-checks/health-checks.module';
import { LoggerModule } from '@common/logger/logger.module';
import { PrismaModule } from '@common/prisma/prisma.module';
import { RedisModule } from '@common/redis/redis.module';

@Module({
	imports: [ConfigModule, HealthChecksModule, LoggerModule, PrismaModule, RedisModule],
})
export class CommonModule {}
