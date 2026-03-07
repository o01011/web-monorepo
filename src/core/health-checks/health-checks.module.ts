import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HealthChecksController } from "./health-checks.controller.js";
import { HealthChecksService } from "./health-checks.service.js";

@Module({
  imports: [TerminusModule],
  controllers: [HealthChecksController],
  providers: [HealthChecksService],
})
export class HealthChecksModule {}
