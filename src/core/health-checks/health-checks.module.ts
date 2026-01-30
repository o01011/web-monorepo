import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HealthChecksController } from "./health-checks.controller.ts";
import { HealthChecksService } from "./health-checks.service.ts";

@Module({
  imports: [TerminusModule],
  controllers: [HealthChecksController],
  providers: [HealthChecksService],
})
export class HealthChecksModule {}
