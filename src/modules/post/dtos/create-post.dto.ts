import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

@ApiSchema({
	description: "Create new post data transfer object",
	name: "CreatePostDto",
})
export class CreatePostDto {
	@ApiProperty({
		description: "Post title",
		example: "Tess of the d'Urbervilles",
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
	title: string;

	@ApiProperty({
		description: "Post description",
		example: "Umquam viscus consectetur deripio curis.",
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
	description: string;

	constructor(title: string, description: string) {
		this.title = title;
		this.description = description;
	}
}
