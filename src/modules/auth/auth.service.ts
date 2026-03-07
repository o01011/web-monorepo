// TODO:
// 36. No HTTP Caching
// Redis is wired but not used for response caching. No CacheInterceptor or cache-aside pattern in services.
import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRdo } from "./rdos/auth.rdo.js";
import { SignUpDto } from "./dtos/sign-up.dto.js";
import { I18nService } from "nestjs-i18n";
import { I18nTranslations } from "../../generated/i18n.generated.js";
import { AuthRepository } from "./auth.repository.js";
import { genSalt, hash } from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { ConfigKeyEnum } from "../../common/enums/config.enum.js";
import { AuthPayloadType } from "../../common/types/auth-payload.type.js";

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
    private readonly i18nService: I18nService<I18nTranslations>,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.getOrThrow<string>(
      `${ConfigKeyEnum.JWT}.secret`,
    );
  }

  public async signIn(userId: number): Promise<AuthRdo> {
    const token = this.generateToken(userId);

    return new AuthRdo(token);
  }

  public async signUp(signUpDto: SignUpDto): Promise<AuthRdo> {
    const user = await this.authRepository.findOneByEmail(signUpDto.email);

    if (user) {
      throw new ConflictException(
        this.i18nService.t("business-logic-exceptions.USER_EXISTS"),
      );
    }

    const hashedPassword = await this.hashPassword(signUpDto.password);

    const newUser = await this.authRepository.create({
      ...signUpDto,
      password: hashedPassword,
    });

    const token = this.generateToken(newUser.id);

    return new AuthRdo(token);
  }

  public async validateToken(token: string): Promise<AuthPayloadType> {
    const authPayload = await this.jwtService.verifyAsync<AuthPayloadType>(
      token,
      {
        secret: this.jwtSecret,
      },
    );

    return {
      userId: authPayload.userId,
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();
    return hash(password, salt);
  }

  private generateToken(userId: number): string {
    return this.jwtService.sign({ userId });
  }
}
