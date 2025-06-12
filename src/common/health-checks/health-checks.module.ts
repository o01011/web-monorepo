import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthChecksController } from './health-checks.controller';
import { HealthChecksService } from './health-checks.service';
import { PrismaModule } from '@common/prisma/prisma.module';

@Module({
	imports: [TerminusModule, PrismaModule],
	controllers: [HealthChecksController],
	providers: [HealthChecksService],
})
export class HealthChecksModule {}
