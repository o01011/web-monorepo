import { Module } from "@nestjs/common";
import { PostService } from "./post.service.js";
import { PostController } from "./post.controller.js";
import { PostRepository } from "./post.repository.js";
import { AuthModule } from "../auth/auth.module.js";

@Module({
  imports: [AuthModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
