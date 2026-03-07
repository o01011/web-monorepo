// TODO:
// 9. No Token Revocation / Blacklisting
// JWTs cannot be invalidated before expiry. There is no logout mechanism.
// Fix: Add a token blacklist in Redis, checked by JwtStrategy.validate().

// TODO:
// 8. No Refresh Token Flow
// Only access tokens are issued. When they expire, users must re-authenticate. No refresh token mechanism exists.
// Fix: Implement refresh tokens (stored in Redis or DB) with a /auth/refresh endpoint.
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service.js";
import { AuthRdo } from "./rdos/auth.rdo.js";
import { SignInDto } from "./dtos/sign-in.dto.js";
import { SignUpDto } from "./dtos/sign-up.dto.js";
import { LocalGuard } from "../../common/guards/local.guard.js";
import { UserId } from "../../common/decorators/user-id.decorator.js";

@ApiTags("Authentication & Authorization")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-in")
  @UseGuards(LocalGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Sign In",
    description: "Sign In flow",
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
    summary: "Sign Up",
    description: "Sign Up flow",
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
