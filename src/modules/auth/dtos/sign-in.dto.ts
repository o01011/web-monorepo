import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
  @ApiProperty({
    example: "Horacio4@hotmail.com",
    description: "User email",
    required: true,
    nullable: false,
    type: String,
  })
  @IsEmail({}, { message: "" })
  @IsNotEmpty({ message: "" })
  email: string;

  @ApiProperty({
    example: "Pa$$wor1",
    description: "User password",
    required: true,
    nullable: false,
    type: String,
  })
  @IsString({ message: "" })
  @IsNotEmpty({ message: "" })
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
