import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthChecksController } from '@core/health-checks/health-checks.controller';
import { HealthChecksService } from '@core/health-checks/health-checks.service';
import { PrismaModule } from '@core/prisma/prisma.module';

@Module({
	imports: [TerminusModule, PrismaModule],
	controllers: [HealthChecksController],
	providers: [HealthChecksService],
})
export class HealthChecksModule {}
