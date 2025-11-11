import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostController } from './post.controller';

@Module({
	imports: [UserModule],
	controllers: [PostController],
	providers: [PostRepository, PostService],
})
export class PostModule {}
