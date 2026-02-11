import { Module } from "@nestjs/common";
import { UserService } from "./user.service.ts";
import { UserController } from "./user.controller.ts";
import { UserRepository } from "./user.repository.ts";

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
