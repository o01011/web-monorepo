import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule as CoreJwtModule, type JwtModuleOptions } from "@nestjs/jwt";
import { ConfigKeyEnum } from "../../common/enums/config.enum.js";

@Module({
	exports: [CoreJwtModule],
	imports: [
		CoreJwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService): JwtModuleOptions => ({
				secret: configService.getOrThrow<string>(`${ConfigKeyEnum.JWT}.secret`),
				signOptions: {
					expiresIn: configService.getOrThrow<number>(`${ConfigKeyEnum.JWT}.expiresIn`),
				},
			}),
		}),
	],
})
export class JwtModule {}
