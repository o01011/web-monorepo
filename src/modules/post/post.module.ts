import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module.js";
import { PostController } from "./post.controller.js";
import { PostRepository } from "./post.repository.js";
import { PostService } from "./post.service.js";

@Module({
	controllers: [PostController],
	imports: [AuthModule],
	providers: [PostService, PostRepository],
})
export class PostModule {}
