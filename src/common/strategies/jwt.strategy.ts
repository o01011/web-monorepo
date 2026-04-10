import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthRepository } from "../../modules/auth/auth.repository.js";
import { ConfigKeysConst } from "../constants/config-keys.const.js";
import { JwtType } from "../types/jwt.type.js";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor(
		@Inject(AuthRepository) private readonly authRepository: AuthRepository,
		@Inject(ConfigService) readonly configService: ConfigService,
	) {
		const jwtConfig = configService.getOrThrow<JwtType>(ConfigKeysConst.JWT);

		super({
			ignoreExpiration: false,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConfig.secret,
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
