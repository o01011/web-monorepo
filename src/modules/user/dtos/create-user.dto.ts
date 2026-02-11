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
    message: "Username must be not empty",
  })
  @MinLength(USER_VALIDATION.USERNAME.MIN_LENGTH, {
    message: "Username must have at least 5 characters",
  })
  @MaxLength(USER_VALIDATION.USERNAME.MAX_LENGTH, {
    message: "Username must be at most 15 characters",
  })
  @ApiProperty({ required: true, nullable: false })
  username: string;

  @IsString({
    message: "First name must be a string",
  })
  @IsNotEmpty({
    message: "First name must be not empty",
  })
  @MinLength(USER_VALIDATION.FIRSTNAME.MIN_LENGTH, {
    message: "First name must have at least 15 characters",
  })
  @MaxLength(USER_VALIDATION.FIRSTNAME.MAX_LENGTH, {
    message: "First name mmust have at most 30 characters",
  })
  @ApiProperty({ required: true, nullable: false })
  firstName: string;

  @IsString({
    message: "Last name must be a string",
  })
  @IsNotEmpty({
    message: "Last name must be not empty",
  })
  @MinLength(USER_VALIDATION.LASTNAME.MIN_LENGTH, {
    message: "Last name must have at least 15 characters",
  })
  @MaxLength(USER_VALIDATION.LASTNAME.MAX_LENGTH, {
    message: "Last name mmust have at most 30 characters",
  })
  @ApiProperty({
    required: true,
    nullable: false,
  })
  lastName: string;

  @IsString({
    message: "Email must be a string",
  })
  @IsNotEmpty({
    message: "Email must be not empty",
  })
  @IsEmail()
  @ApiProperty({
    required: true,
    nullable: false,
  })
  email: string;

  constructor(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
  ) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
