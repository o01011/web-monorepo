import { Module } from "@nestjs/common";
import { PostService } from "./post.service.ts";
import { PostController } from "./post.controller.ts";
import { PrismaModule } from "../../core/prisma/prisma.module.ts";
import { PostRepository } from "./post.repository.ts";

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository],
  imports: [PrismaModule],
})
export class PostModule {}
