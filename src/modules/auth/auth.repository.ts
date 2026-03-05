// TODO: check if needed to try catch here (maybe go to GEF)
import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../core/prisma/prisma.service.ts";
import { SignUpDto } from "./dtos/sign-up.dto.ts";
import { I18nService } from "nestjs-i18n";
import { I18nTranslations } from "../../generated/i18n.generated.ts";
import { UserRdo } from "./rdos/user.rdo.ts";

@Injectable()
export class AuthRepository {
  private readonly logger;
  constructor(
    private readonly prismaService: PrismaService,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {
    this.logger = new Logger(AuthRepository.name);
  }

  public async create(signUpDto: SignUpDto): Promise<UserRdo> {
    return await this.prismaService.user.create({
      data: signUpDto,
    });
  }

  public async findOneByEmail(email: string): Promise<UserRdo | null> {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async findOneById(id: number): Promise<UserRdo | null> {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }
}
