import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
	@ApiProperty({
		description: "Unique username",
		example: "Eldred_Ondricka",
		maxLength: 15,
		minLength: 5,
		nullable: false,
		required: true,
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
		description: "User first name",
		example: "Paige",
		maxLength: 30,
		minLength: 5,
		nullable: false,
		required: true,
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
		description: "User last name",
		example: "Altenwerth",
		maxLength: 30,
		minLength: 5,
		nullable: false,
		required: true,
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
		description: "User email",
		example: "Horacio4@hotmail.com",
		nullable: false,
		required: true,
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
		description: "User password",
		example: "Pa$$wor1",
		maxLength: 100,
		minLength: 5,
		nullable: false,
		required: true,
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
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{5,}$/, {
		message: "",
	})
	password: string;

	constructor(username: string, firstName: string, lastName: string, email: string, password: string) {
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
	}
}
