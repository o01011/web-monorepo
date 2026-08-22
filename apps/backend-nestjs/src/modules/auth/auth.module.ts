import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../../common/strategies/jwt.strategy.js";
import { LocalStrategy } from "../../common/strategies/local.strategy.js";
import { JwtModule } from "../../core/jwt/jwt.module.js";
import { AuthController } from "./auth.controller.js";
import { AuthRepository } from "./auth.repository.js";
import { AuthService } from "./auth.service.js";

@Module({
	controllers: [AuthController],
	exports: [AuthService, AuthRepository],
	imports: [JwtModule, PassportModule],
	providers: [AuthService, AuthRepository, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
