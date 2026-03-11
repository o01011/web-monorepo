import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { compare } from "bcrypt";
import type { I18nService } from "nestjs-i18n";
import { Strategy } from "passport-local";
import type { I18nTranslations } from "../../generated/i18n.generated.js";
import type { AuthRepository } from "../../modules/auth/auth.repository.js";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {
		super({
			passwordField: "password",
			usernameField: "email",
		});
	}

	async validate(email: string, password: string): Promise<number> {
		const user = await this.authRepository.findOneByEmail(email);

		if (!user) {
			throw new UnauthorizedException(this.i18nService.t("business-logic-exceptions.INVALID_CREDENTIALS"));
		}

		const isPasswordValid = await compare(password, user.password);

		if (!isPasswordValid) {
			throw new UnauthorizedException(this.i18nService.t("business-logic-exceptions.INVALID_CREDENTIALS"));
		}

		return user.id;
	}
}
