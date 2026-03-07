import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

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
  @IsString({
    message: i18nValidationMessage("dtos-validation.STRING"),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("dtos-validation.EMPTY"),
  })
  @MinLength(5, {
    message: i18nValidationMessage("dtos-validation.MIN"),
  })
  @MaxLength(15, {
    message: i18nValidationMessage("dtos-validation.MAX"),
  })
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
  @IsString({
    message: i18nValidationMessage("dtos-validation.STRING"),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("dtos-validation.EMPTY"),
  })
  @MinLength(5, {
    message: i18nValidationMessage("dtos-validation.MIN"),
  })
  @MaxLength(30, {
    message: i18nValidationMessage("dtos-validation.MAX"),
  })
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
  @IsString({
    message: i18nValidationMessage("dtos-validation.STRING"),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("dtos-validation.EMPTY"),
  })
  @MinLength(5, {
    message: i18nValidationMessage("dtos-validation.MIN"),
  })
  @MaxLength(30, {
    message: i18nValidationMessage("dtos-validation.MAX"),
  })
  lastName: string;

  @ApiProperty({
    example: "Horacio4@hotmail.com",
    description: "User email",
    required: true,
    nullable: false,
    type: String,
  })
  @IsString({
    message: i18nValidationMessage("dtos-validation.STRING"),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("dtos-validation.EMPTY"),
  })
  @IsEmail(
    {},
    {
      message: i18nValidationMessage("dtos-validation.EMAIL"),
    },
  )
  email: string;

  @ApiProperty({
    example: "Pa$$wor1",
    description: "User password",
    minLength: 5,
    maxLength: 100,
    required: true,
    nullable: false,
    type: String,
  })
  @IsString({
    message: i18nValidationMessage("dtos-validation.STRING"),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("dtos-validation.EMPTY"),
  })
  @MinLength(5, {
    message: i18nValidationMessage("dtos-validation.MIN"),
  })
  @MaxLength(100, {
    message: i18nValidationMessage("dtos-validation.MAX"),
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{5,}$/, {
    message: i18nValidationMessage("dtos-validation.MATCHES"),
  })
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
