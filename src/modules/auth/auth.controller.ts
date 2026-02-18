import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service.ts";
import { AuthRdo } from "./rdos/auth.entity.ts";
import { SignInDto } from "./dtos/sign-in.dto.ts";
import { AuthControllerConst } from "./constants/auth-controller.constant.ts";
import { SignUpDto } from "./dtos/sign-up.dto.ts";

@ApiTags(AuthControllerConst.API_TAG)
@Controller(AuthControllerConst.PATH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AuthControllerConst.ROUTES.SIGN_IN)
  @ApiOkResponse({
    type: AuthRdo,
  })
  public signIn(@Body() signInDto: SignInDto): Promise<AuthRdo> {
    return this.authService.signIn(signInDto);
  }

  @Post(AuthControllerConst.ROUTES.SIGN_UP)
  @ApiOkResponse({
    type: AuthRdo,
  })
  public signUp(@Body() signUpDto: SignUpDto): Promise<AuthRdo> {
    return this.authService.signUp(signUpDto);
  }
}
