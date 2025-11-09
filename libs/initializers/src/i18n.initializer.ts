import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { I18nModule, QueryResolver, AcceptLanguageResolver, HeaderResolver } from 'nestjs-i18n';
import { join } from 'path';

export const I18nInitializer = (): DynamicModule => {
	return I18nModule.forRootAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: (configService: ConfigService) => ({
			fallbackLanguage: configService.get<string>('FALLBACK_LANGUAGE'),
			loaderOptions: {
				path: join(__dirname, '/i18n/'),
				watch: true,
			},
		}),
		resolvers: [
			{
				use: QueryResolver,
				options: ['lang'],
			},
			AcceptLanguageResolver,
			new HeaderResolver(['x-lang']),
		],
	});
};
