import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule as CoreJwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigKeyEnum } from "../../common/enums/config.enum.ts";

@Module({
  imports: [
    CoreJwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => ({
        secret: configService.get<string>(`${ConfigKeyEnum.JWT}.secret`),
        signOptions: {
          expiresIn: configService.get<number>(
            `${ConfigKeyEnum.JWT}.expiresIn`,
          ),
        },
      }),
    }),
  ],
  exports: [CoreJwtModule],
})
export class JwtModule {}
