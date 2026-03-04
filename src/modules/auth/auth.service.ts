import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRdo } from "./rdos/auth.entity.ts";
import { SignInDto } from "./dtos/sign-in.dto.ts";
import { SignUpDto } from "./dtos/sign-up.dto.ts";
import { I18nService } from "nestjs-i18n";
import { I18nTranslations } from "../../generated/i18n.generated.ts";
import { AuthRepository } from "./auth.repository.ts";
import { genSalt, hash, compare } from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { ConfigKeyEnum } from "../../common/enums/config.enum.ts";
import { AuthPayloadType } from "../../common/types/auth-payload.type.ts";

@Injectable()
export class AuthService {
  private readonly logger: Logger;
  private readonly jwtSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
    private readonly i18nService: I18nService<I18nTranslations>,
    private readonly configService: ConfigService,
  ) {
    this.logger = new Logger(AuthService.name);
    this.jwtSecret = this.configService.getOrThrow<string>(
      `${ConfigKeyEnum.JWT}.secret`,
    );
  }

  public async signIn(signInDto: SignInDto): Promise<AuthRdo> {
    try {
      const user = await this.authRepository.findOneByEmail(signInDto.email);

      if (!user) {
        throw new UnauthorizedException(this.i18nService.t("auth.NOT_FOUND"));
      }

      const isPasswordValid = await compare(signInDto.password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException(
          this.i18nService.t("auth.INCORRECT_CREDENTIALS"),
        );
      }

      const token = this.generateToken(user.id);

      return new AuthRdo(token);
    } catch (e) {
      if (!(e instanceof HttpException)) {
        this.logger.error(
          `${this.i18nService.t("auth.INTERNAL_SERVER_ERROR")}: ${e}`,
        );
        throw new InternalServerErrorException(
          this.i18nService.t("auth.INTERNAL_SERVER_ERROR"),
        );
      }
      throw e;
    }
  }

  public async signUp(signUpDto: SignUpDto): Promise<AuthRdo> {
    try {
      const user = await this.authRepository.findOneByEmail(signUpDto.email);

      if (user) {
        throw new UnauthorizedException(this.i18nService.t("auth.USER_EXISTS"));
      }

      const hashedPassword = await this.hashPassword(signUpDto.password);

      const newUser = await this.authRepository.create({
        ...signUpDto,
        password: hashedPassword,
      });

      const token = this.generateToken(newUser.id);

      return new AuthRdo(token);
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      this.logger.error(
        `${this.i18nService.t("auth.INTERNAL_SERVER_ERROR")}: ${e}`,
      );
      throw new InternalServerErrorException(
        this.i18nService.t("auth.INTERNAL_SERVER_ERROR"),
      );
    }
  }

  public async validateToken(token: string): Promise<AuthPayloadType> {
    try {
      const authPayload = await this.jwtService.verifyAsync<AuthPayloadType>(
        token,
        {
          secret: this.jwtSecret,
        },
      );

      return {
        userId: authPayload.userId,
      };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      this.logger.error(
        `${this.i18nService.t("auth.INTERNAL_SERVER_ERROR")}: ${e}`,
      );
      throw new InternalServerErrorException(
        this.i18nService.t("auth.INTERNAL_SERVER_ERROR"),
      );
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();
    return hash(password, salt);
  }

  private generateToken(userId: number): string {
    return this.jwtService.sign({ userId });
  }
}
