import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { PrismaService } from "../../core/prisma/prisma.service.ts";
import { UserEntity } from "./entities/user.entity.ts";
import { SignUpDto } from "./dtos/sign-up.dto.ts";
import { I18nService } from "nestjs-i18n";
import { I18nTranslations } from "../../generated/i18n.generated.ts";

@Injectable()
export class AuthRepository {
  private readonly logger;
  constructor(
    private readonly prismaService: PrismaService,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {
    this.logger = new Logger(AuthRepository.name);
  }

  public async create(signUpDto: SignUpDto): Promise<UserEntity> {
    try {
      return await this.prismaService.user.create({
        data: signUpDto,
      });
    } catch (e) {
      this.logger.error(
        `${this.i18nService.t("auth.INTERNAL_SERVER_ERROR")}: ${e}`,
      );
      throw new InternalServerErrorException(
        this.i18nService.t("auth.INTERNAL_SERVER_ERROR"),
      );
    }
  }

  public async findOneByEmail(email: string): Promise<UserEntity | null> {
    try {
      return await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });
    } catch (e) {
      this.logger.error(
        `${this.i18nService.t("auth.INTERNAL_SERVER_ERROR")}: ${e}`,
      );
      throw new InternalServerErrorException(
        this.i18nService.t("auth.INTERNAL_SERVER_ERROR"),
      );
    }
  }

  public async findOneById(id: number): Promise<UserEntity | null> {
    try {
      return await this.prismaService.user.findUnique({
        where: {
          id,
        },
      });
    } catch (e) {
      this.logger.error(
        `${this.i18nService.t("auth.INTERNAL_SERVER_ERROR")}: ${e}`,
      );
      throw new InternalServerErrorException(
        this.i18nService.t("auth.INTERNAL_SERVER_ERROR"),
      );
    }
  }
}
