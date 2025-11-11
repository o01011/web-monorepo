import { CoreModule } from '@libs/core/core.module';
import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { UserModule } from './users/user.module';

@Module({
	imports: [CoreModule, PostModule, UserModule],
})
export class NestjsBoilerplateMobileAdmin {}
