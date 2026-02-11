import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { USER_VALIDATION } from "../constants/user-validation.constant.ts";

export class CreateUserDto {
  @IsString({
    message: "Username must be a string",
  })
  @IsNotEmpty({
    message: "Username is required",
  })
  @MinLength(USER_VALIDATION.USERNAME.MIN_LENGTH, {
    message: `Username must have at least ${USER_VALIDATION.USERNAME.MIN_LENGTH} characters`,
  })
  @MaxLength(USER_VALIDATION.USERNAME.MAX_LENGTH, {
    message: `Username must be at most ${USER_VALIDATION.USERNAME.MAX_LENGTH} characters`,
  })
  @ApiProperty({
    example: "Eldred_Ondricka",
    description: "Unique username",
    minLength: USER_VALIDATION.USERNAME.MIN_LENGTH,
    maxLength: USER_VALIDATION.USERNAME.MAX_LENGTH,
    required: true,
    nullable: false,
  })
  username!: string;

  @IsString({
    message: "First name must be a string",
  })
  @IsNotEmpty({
    message: "First name is required",
  })
  @MinLength(USER_VALIDATION.FIRSTNAME.MIN_LENGTH, {
    message: `First name must have at least ${USER_VALIDATION.FIRSTNAME.MIN_LENGTH} characters`,
  })
  @MaxLength(USER_VALIDATION.FIRSTNAME.MAX_LENGTH, {
    message: `First name mmust have at most ${USER_VALIDATION.FIRSTNAME.MAX_LENGTH} characters`,
  })
  @ApiProperty({
    example: "Paige",
    description: "User first name",
    minLength: USER_VALIDATION.FIRSTNAME.MIN_LENGTH,
    maxLength: USER_VALIDATION.FIRSTNAME.MAX_LENGTH,
    required: true,
    nullable: false,
  })
  firstName!: string;

  @IsString({
    message: "Last name must be a string",
  })
  @IsNotEmpty({
    message: "Last name must be not empty",
  })
  @MinLength(USER_VALIDATION.LASTNAME.MIN_LENGTH, {
    message: `Last name must have at least ${USER_VALIDATION.LASTNAME.MIN_LENGTH} characters`,
  })
  @MaxLength(USER_VALIDATION.LASTNAME.MAX_LENGTH, {
    message: `Last name mmust have at most ${USER_VALIDATION.LASTNAME.MAX_LENGTH} characters`,
  })
  @ApiProperty({
    example: "Altenwerth",
    description: "User last name",
    minLength: USER_VALIDATION.LASTNAME.MIN_LENGTH,
    maxLength: USER_VALIDATION.LASTNAME.MAX_LENGTH,
    required: true,
    nullable: false,
  })
  lastName!: string;

  @IsString({
    message: "Email must be a string",
  })
  @IsNotEmpty({
    message: "Email must be not empty",
  })
  @IsEmail()
  @ApiProperty({
    example: "Horacio4@hotmail.com",
    description: "user email",
    required: true,
    nullable: false,
  })
  email!: string;
}
