import { ConfigInitializer, I18nInitializer, RedisInitializer } from '@app/initializers';
import { Module } from '@nestjs/common';

@Module({
	imports: [ConfigInitializer(), RedisInitializer(), I18nInitializer()],
	controllers: [],
	providers: [],
})
export class AppModule {}
