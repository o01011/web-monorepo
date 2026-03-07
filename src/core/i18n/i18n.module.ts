import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { I18nModule as CoreI18nModule, HeaderResolver } from "nestjs-i18n";
import { join } from "node:path";
import { EnvironmentsEnum } from "../../common/enums/environments.enum.js";
import { ConfigKeyEnum } from "../../common/enums/config.enum.js";

@Module({
  imports: [
    CoreI18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: String(
          configService.getOrThrow<string>(
            `${ConfigKeyEnum.I18N}.i18nFallbackLanguage`,
          ),
        ),
        loaderOptions: {
          path:
            process.env["NODE_ENV"] === EnvironmentsEnum.PRODUCTION
              ? join(process.cwd(), "dist", "i18n")
              : join(process.cwd(), "src", "i18n"),
          watch: true,
        },
        typesOutputPath: join("src/generated/i18n.generated.ts"),
      }),
      resolvers: [new HeaderResolver(["x-lang"])],
      inject: [ConfigService],
    }),
  ],
})
export class I18nModule {}
