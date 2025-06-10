import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { HealthChecksModule } from './health-checks/health-checks.module';
import { LoggerModule } from './logger/logger.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';

@Module({
	imports: [ConfigModule, HealthChecksModule, LoggerModule, PrismaModule, RedisModule],
})
export class CommonModule {}
