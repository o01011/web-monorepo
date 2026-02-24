import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../../core/prisma/prisma.service.ts";
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
  private readonly logger;
  private readonly jwtSecret;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
    private readonly i18nService: I18nService<I18nTranslations>,
    private readonly configService: ConfigService,
  ) {
    this.logger = new Logger(AuthService.name);
    this.jwtSecret = this.configService.get(`${ConfigKeyEnum.JWT}.secret`);
  }

  public async signIn(signInDto: SignInDto): Promise<AuthRdo> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: signInDto.email,
        },
      });

      if (!user) {
        throw new NotFoundException(this.i18nService.t("auth.NOT_FOUND"));
      }

      if (!(await compare(signInDto.password, user.password))) {
        throw new ConflictException(
          this.i18nService.t("auth.INCORRECT_CREDENTIALS"),
        );
      }

      const token = this.generateToken(user.id);

      return new AuthRdo(token);
    } catch (e) {
      this.logger.error(
        `${this.i18nService.t("auth.INTERNAL_SERVER_ERROR")}: ${e}`,
      );
      throw new InternalServerErrorException(
        this.i18nService.t("auth.INTERNAL_SERVER_ERROR"),
      );
    }
  }

  public async signUp(signUpDto: SignUpDto): Promise<AuthRdo> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: signUpDto.email,
        },
      });

      if (user) {
        throw new ConflictException(this.i18nService.t("auth.USER_EXISTS"));
      }

      const hashedPassword = await this.hashPassword(signUpDto.password);

      const newUser = await this.authRepository.create({
        ...signUpDto,
        password: hashedPassword,
      });

      const token = this.generateToken(newUser.id);

      return new AuthRdo(token);
    } catch (e) {
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
      const authPayload = (await this.jwtService.verifyAsync(
        token,
        this.jwtSecret,
      )) as AuthPayloadType;

      return {
        userId: authPayload.userId,
      };
    } catch (e) {
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
