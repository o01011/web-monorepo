import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule as CoreJwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigKeyEnum } from "../../common/enums/config.enum.js";

@Module({
  imports: [
    CoreJwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => ({
        secret: configService.getOrThrow<string>(`${ConfigKeyEnum.JWT}.secret`),
        signOptions: {
          expiresIn: configService.getOrThrow<number>(
            `${ConfigKeyEnum.JWT}.expiresIn`,
          ),
        },
      }),
    }),
  ],
  exports: [CoreJwtModule],
})
export class JwtModule {}
