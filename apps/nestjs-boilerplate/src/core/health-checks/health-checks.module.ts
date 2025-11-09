import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthChecksController } from '@core/health-checks/health-checks.controller';
import { HealthChecksService } from '@core/health-checks/health-checks.service';

@Module({
	imports: [TerminusModule],
	controllers: [HealthChecksController],
	providers: [HealthChecksService],
})
export class HealthChecksModule {}
