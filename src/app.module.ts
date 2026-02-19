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
import { join } from "path";
import { AuthControllerConst } from "./modules/auth/constants/auth-controller.constant.ts";

@Module({
  imports: [CoreModule, PostModule, AuthModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: join(
            "api/v1",
            AuthControllerConst.PATH,
            AuthControllerConst.ROUTES.SIGN_UP,
          ),
          method: RequestMethod.POST,
        },
        {
          path: join(
            "api/v1",
            AuthControllerConst.PATH,
            AuthControllerConst.ROUTES.SIGN_IN,
          ),
          method: RequestMethod.POST,
        },
      )
      .forRoutes("*");
  }
}
