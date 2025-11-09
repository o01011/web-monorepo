import { Module } from '@nestjs/common';
import { PostsController } from '@modules/posts/posts.controller';
import { PostsRepository } from '@modules/posts/posts.repository';
import { PostsService } from '@modules/posts/posts.service';
import { UsersModule } from '@modules/users/users.module';

@Module({
	imports: [UsersModule],
	controllers: [PostsController],
	providers: [PostsRepository, PostsService],
})
export class PostsModule {}
