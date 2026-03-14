import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

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
			message: "",
		},
	)
	@IsNotEmpty({ message: "" })
	email: string;

	@ApiProperty({
		description: "User password",
		example: "Pa$$wor1",
		nullable: false,
		required: true,
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
