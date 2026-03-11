import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

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
		description: "User first name",
		example: "Paige",
		maxLength: 30,
		minLength: 5,
		nullable: false,
		required: true,
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
		description: "User last name",
		example: "Altenwerth",
		maxLength: 30,
		minLength: 5,
		nullable: false,
		required: true,
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
		description: "User email",
		example: "Horacio4@hotmail.com",
		nullable: false,
		required: true,
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
		description: "User password",
		example: "Pa$$wor1",
		maxLength: 100,
		minLength: 5,
		nullable: false,
		required: true,
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

	constructor(username: string, firstName: string, lastName: string, email: string, password: string) {
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
	}
}
