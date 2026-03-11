import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HealthChecksController } from "./health-checks.controller.js";
import { HealthChecksService } from "./health-checks.service.js";

@Module({
	controllers: [HealthChecksController],
	imports: [TerminusModule],
	providers: [HealthChecksService],
})
export class HealthChecksModule {}
