import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "../../modules/auth/auth.service.ts";
import { Request, Response, NextFunction } from "express";
import { AuthPayloadType } from "../../common/types/auth-payload.type.ts";
import { I18nService } from "nestjs-i18n";
import { I18nTranslations } from "../../generated/i18n.generated.ts";

interface RequestWithUser extends Request {
  user: AuthPayloadType;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger;

  constructor(
    private readonly authService: AuthService,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {
    this.logger = new Logger(AuthMiddleware.name);
  }

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const authPayload = await this.authService.validateToken(token);

      req.user = authPayload;

      next();
    } catch (e) {
      this.logger.error(
        `${this.i18nService.t(`auth.INTERNAL_SERVER_ERROR`)}: ${e}`,
      );
      throw new InternalServerErrorException();
    }
  }
}
