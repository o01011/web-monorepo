import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { CoreModule } from "./core/core.module.ts";
import { PostModule } from "./modules/post/post.module.ts";
import { AuthModule } from "./modules/auth/auth.module.ts";
import { AuthMiddleware } from "./core/middlewares/auth.middleware.ts";

@Module({
  imports: [CoreModule, PostModule, AuthModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({
        path: "auth/sign-in",
        method: RequestMethod.POST,
      })
      .forRoutes("*");
  }
}
