import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service.ts";
import { AuthRdo } from "./rdos/auth.entity.ts";
import { SignInDto } from "./dtos/sign-in.dto.ts";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-in")
  @ApiOkResponse({
    type: AuthRdo,
  })
  public signIn(@Body() signInDto: SignInDto): Promise<AuthRdo> {
    return this.authService.signIn(signInDto);
  }
}
