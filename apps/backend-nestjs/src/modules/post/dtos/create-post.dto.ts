import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

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
	description: string;

	constructor(title: string, description: string) {
		this.title = title;
		this.description = description;
	}
}
