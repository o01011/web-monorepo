import { Module } from "@nestjs/common";
import { CoreModule } from "./core/core.module.ts";
import { PostModule } from "./modules/post/post.module.ts";
import { AuthModule } from "./modules/auth/auth.module.ts";

@Module({
  imports: [CoreModule, PostModule, AuthModule],
})
export class AppModule {}
