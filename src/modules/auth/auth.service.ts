import { ConflictException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { genSalt, hash } from "bcrypt";
import { I18nService } from "nestjs-i18n";
import { ConfigKeyEnum } from "../../common/enums/config.enum.js";
import { AuthPayloadType } from "../../common/types/auth-payload.type.js";
import { I18nTranslations } from "../../generated/i18n.generated.js";
import { AuthRepository } from "./auth.repository.js";
import { SignUpDto } from "./dtos/sign-up.dto.js";
import { AuthRdo } from "./rdos/auth.rdo.js";

@Injectable()
export class AuthService {
	private readonly jwtSecret: string;

	constructor(
		private readonly jwtService: JwtService,
		private readonly authRepository: AuthRepository,
		private readonly i18nService: I18nService<I18nTranslations>,
		private readonly configService: ConfigService,
	) {
		this.jwtSecret = this.configService.getOrThrow<string>(`${ConfigKeyEnum.JWT}.secret`);
	}

	public async signIn(userId: number): Promise<AuthRdo> {
		const token = this.generateToken(userId);

		return new AuthRdo(token);
	}

	public async signUp(signUpDto: SignUpDto): Promise<AuthRdo> {
		const user = await this.authRepository.findOneByEmail(signUpDto.email);

		if (user) {
			throw new ConflictException(this.i18nService.t("business-logic-exceptions.USER_EXISTS"));
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
		const authPayload = await this.jwtService.verifyAsync<AuthPayloadType>(token, {
			secret: this.jwtSecret,
		});

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
