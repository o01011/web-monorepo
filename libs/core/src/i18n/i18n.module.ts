import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nModule as CoreI18nModule, QueryResolver, AcceptLanguageResolver } from 'nestjs-i18n';
import { join } from 'node:path';

@Module({
	imports: [
		CoreI18nModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				fallbackLanguage: configService.get<string>('FALLBACK_LANGUAGE'),
				loaderOptions: {
					path: join(process.cwd(), 'libs', 'i18n', 'src'),
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
