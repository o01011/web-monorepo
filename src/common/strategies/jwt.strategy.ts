import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthRepository } from "../../modules/auth/auth.repository.js";
import { ConfigKeyEnum } from "../enums/config.enum.js";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor(
		private readonly authRepository: AuthRepository,
		readonly configService: ConfigService,
	) {
		super({
			ignoreExpiration: false,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.getOrThrow<string>(`${ConfigKeyEnum.JWT}.secret`),
		});
	}

	async validate(payload: { userId: number }): Promise<number> {
		const user = await this.authRepository.findOneById(payload.userId);

		if (!user) {
			throw new UnauthorizedException();
		}

		return payload.userId;
	}
}
