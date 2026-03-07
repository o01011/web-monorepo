import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";
import { AuthRepository } from "./auth.repository.js";
import { JwtModule } from "../../core/jwt/jwt.module.js";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../../common/strategies/jwt.strategy.js";
import { LocalStrategy } from "../../common/strategies/local.strategy.js";

@Module({
  imports: [JwtModule, PassportModule],
  providers: [AuthService, AuthRepository, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService, AuthRepository],
})
export class AuthModule {}
