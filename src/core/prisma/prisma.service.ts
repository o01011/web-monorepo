import { Injectable, type OnModuleDestroy, type OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../prisma/generated/client.js";
import { ConfigKeyEnum } from "../../common/enums/config.enum.js";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	constructor(readonly configService: ConfigService) {
		const adapter: PrismaPg = new PrismaPg({
			connectionString: configService.getOrThrow<string>(`${ConfigKeyEnum.DB}.postgresUrl`),
		});

		super({ adapter });
	}
	async onModuleInit(): Promise<void> {
		await this.$connect();
	}

	async onModuleDestroy(): Promise<void> {
		await this.$disconnect();
	}
}
