import { Module } from "@nestjs/common";
import { CoreModule } from "./core/core.module.ts";
import { UserModule } from "./modules/user/user.module.ts";
import { PostModule } from "./modules/post/post.module.ts";

@Module({
  imports: [CoreModule, UserModule, PostModule],
})
export class AppModule {}
