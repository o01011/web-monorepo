import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { ConfigKeyEnum } from "../enums/config.enum.ts";
import { AuthRepository } from "../../modules/auth/auth.repository.ts";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>(
        `${ConfigKeyEnum.JWT}.secret`,
      ),
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
