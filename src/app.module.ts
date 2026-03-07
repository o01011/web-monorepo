import { Module } from "@nestjs/common";
import { CoreModule } from "./core/core.module.js";
import { PostModule } from "./modules/post/post.module.js";
import { AuthModule } from "./modules/auth/auth.module.js";

@Module({
  imports: [CoreModule, PostModule, AuthModule],
})
export class AppModule {}
