import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {
  @ApiProperty({
    example: "Eldred_Ondricka",
    description: "Unique username",
    minLength: 5,
    maxLength: 15,
    required: true,
    nullable: false,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: "Paige",
    description: "User first name",
    minLength: 5,
    maxLength: 30,
    required: true,
    nullable: false,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: "Altenwerth",
    description: "User last name",
    minLength: 5,
    maxLength: 30,
    required: true,
    nullable: false,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: "Horacio4@hotmail.com",
    description: "User email",
    required: true,
    nullable: false,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "Pa$$wor1",
    description: "User password",
    required: true,
    nullable: false,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
