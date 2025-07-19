import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/users/users.module';

@Module({
	imports: [CoreModule, UsersModule],
})
export class AppModule {}
