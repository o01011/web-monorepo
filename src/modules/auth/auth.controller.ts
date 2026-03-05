import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service.ts";
import { AuthRdo } from "./rdos/auth.rdo.ts";
import { SignInDto } from "./dtos/sign-in.dto.ts";
import { AuthControllerConst } from "./constants/auth-controller.constant.ts";
import { SignUpDto } from "./dtos/sign-up.dto.ts";

@ApiTags(AuthControllerConst.API_TAG)
@Controller(AuthControllerConst.PATH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AuthControllerConst.ROUTES.SIGN_IN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
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
  public signIn(@Body() signInDto: SignInDto): Promise<AuthRdo> {
    return this.authService.signIn(signInDto);
  }

  @Post(AuthControllerConst.ROUTES.SIGN_UP)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
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
