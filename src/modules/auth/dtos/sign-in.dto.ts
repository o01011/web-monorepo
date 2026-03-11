import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class SignInDto {
	@ApiProperty({
		description: "User email",
		example: "Horacio4@hotmail.com",
		nullable: false,
		required: true,
		type: String,
	})
	@IsEmail(
		{},
		{
			message: i18nValidationMessage("dtos-validation.EMAIL"),
		},
	)
	@IsNotEmpty({ message: i18nValidationMessage("dtos-validation.EMPTY") })
	email: string;

	@ApiProperty({
		description: "User password",
		example: "Pa$$wor1",
		nullable: false,
		required: true,
		type: String,
	})
	@IsString({ message: i18nValidationMessage("dtos-validation.STRING") })
	@IsNotEmpty({ message: i18nValidationMessage("dtos-validation.EMPTY") })
	password: string;

	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}
}
