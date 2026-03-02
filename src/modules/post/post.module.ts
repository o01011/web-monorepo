import { Module } from "@nestjs/common";
import { PostService } from "./post.service.ts";
import { PostController } from "./post.controller.ts";
import { PostRepository } from "./post.repository.ts";
import { JwtStrategy } from "../../common/strategies/jwt.strategy.ts";
import { AuthModule } from "../auth/auth.module.ts";

@Module({
  imports: [AuthModule],
  controllers: [PostController],
  providers: [PostService, PostRepository, JwtStrategy],
})
export class PostModule {}
