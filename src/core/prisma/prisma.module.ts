import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module.js";
import { PrismaService } from "./prisma.service.js";

@Global()
@Module({
	exports: [PrismaService],
	imports: [ConfigModule],
	providers: [PrismaService],
})
export class PrismaModule {}
