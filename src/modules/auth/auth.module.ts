import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service.ts";
import { AuthController } from "./auth.controller.ts";
import { AuthRepository } from "./auth.repository.ts";
import { JwtModule } from "../../core/jwt/jwt.module.ts";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../../common/strategies/jwt.strategy.ts";

@Module({
  imports: [JwtModule, PassportModule],
  providers: [AuthService, AuthRepository, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, AuthRepository],
})
export class AuthModule {}
