import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { UserId } from "../../common/decorators/user-id.decorator.js";
import { LocalGuard } from "../../common/guards/local.guard.js";
import type { AuthService } from "./auth.service.js";
import { SignInDto } from "./dtos/sign-in.dto.js";
import type { SignUpDto } from "./dtos/sign-up.dto.js";
import { AuthRdo } from "./rdos/auth.rdo.js";

@ApiTags("Authentication & Authorization")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("sign-in")
	@UseGuards(LocalGuard)
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		description: "Sign In flow",
		summary: "Sign In",
	})
	@ApiOkResponse({
		description: "Sucess",
		type: AuthRdo,
	})
	@ApiUnauthorizedResponse({
		description: "Invalid credentials",
	})
	@ApiUnauthorizedResponse({
		description: "User not found. Try to sign up.",
	})
	@ApiBody({
		type: SignInDto,
	})
	public signIn(@UserId() userId: number): Promise<AuthRdo> {
		return this.authService.signIn(userId);
	}

	@Post("sign-up")
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({
		description: "Sign Up flow",
		summary: "Sign Up",
	})
	@ApiCreatedResponse({
		description: "Success",
		type: AuthRdo,
	})
	@ApiUnauthorizedResponse({
		description: "",
	})
	public signUp(@Body() signUpDto: SignUpDto): Promise<AuthRdo> {
		return this.authService.signUp(signUpDto);
	}
}
