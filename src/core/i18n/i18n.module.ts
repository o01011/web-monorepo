import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  I18nModule as CoreI18nModule,
  QueryResolver,
  AcceptLanguageResolver,
} from 'nestjs-i18n';
import { join } from 'node:path';

@Module({
  imports: [
    CoreI18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: String(
          configService.get<string>('I18N_FALLBACK_LANGUAGE'),
        ),
        loaderOptions: {
          path: join(process.cwd(), 'src', 'i18n'),
          watch: true,
        },
      }),
      resolvers: [
        {
          use: QueryResolver,
          options: ['lang'],
        },
        AcceptLanguageResolver,
      ],
      inject: [ConfigService],
    }),
  ],
})
export class I18nModule {}
