import { Module } from "@nestjs/common";
import { PostService } from "./post.service.ts";
import { PostController } from "./post.controller.ts";
import { PostRepository } from "./post.repository.ts";

@Module({
  providers: [PostService, PostRepository],
  controllers: [PostController],
})
export class PostModule {}
