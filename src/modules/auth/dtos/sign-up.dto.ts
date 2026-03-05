import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

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
    message: "",
  })
  @IsNotEmpty({
    message: "",
  })
  @MinLength(5, {
    message: "",
  })
  @MaxLength(15, {
    message: "",
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
    message: "",
  })
  @IsNotEmpty({
    message: "",
  })
  @MinLength(5, {
    message: "",
  })
  @MaxLength(30, {
    message: "",
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
    message: "",
  })
  @IsNotEmpty({
    message: "",
  })
  @MinLength(5, {
    message: "",
  })
  @MaxLength(30, {
    message: "",
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
    message: "",
  })
  @IsNotEmpty({
    message: "",
  })
  @IsEmail(
    {},
    {
      message: "",
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
    message: "",
  })
  @IsNotEmpty({
    message: "",
  })
  @MinLength(5, {
    message: "",
  })
  @MaxLength(100, {
    message: "",
  })
  @Matches(/A-z/, {
    // TODO: add correct regex
    message: "",
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
