import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthChecksController } from './health-checks.controller';
import { HealthChecksService } from './health-checks.service';

@Module({
	imports: [TerminusModule],
	controllers: [HealthChecksController],
	providers: [HealthChecksService],
})
export class HealthChecksModule {}
