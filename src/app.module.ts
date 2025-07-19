import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/users/users.module';
import { PostsModule } from '@modules/posts/posts.module';

@Module({
	imports: [CoreModule, UsersModule, PostsModule],
})
export class AppModule {}
