import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule as CoreJwtModule, type JwtModuleOptions } from "@nestjs/jwt";
import { ConfigKeysConst } from "../../common/constants/config-keys.const.js";
import { JwtType } from "../../common/types/jwt.type.js";

@Module({
	exports: [CoreJwtModule],
	imports: [
		CoreJwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService): JwtModuleOptions => {
				const jwtConfig = configService.getOrThrow<JwtType>(ConfigKeysConst.JWT);

				return {
					secret: jwtConfig.secret,
					signOptions: {
						expiresIn: jwtConfig.expiresIn,
					},
				};
			},
		}),
	],
})
export class JwtModule {}
