import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";
import { POST_VALIDATION } from "../constants/post-validation.constant.ts";

@ApiSchema({
  name: "CreatePostDto",
  description: "Create new post data transfer object",
})
export class CreatePostDto {
  @IsString({
    message: "Title must be a string",
  })
  @IsNotEmpty({
    message: "Title is required",
  })
  @MinLength(POST_VALIDATION.TITLE.MIN_LENGTH, {
    message: `Title must be at lest ${POST_VALIDATION.TITLE.MIN_LENGTH} characters`,
  })
  @MaxLength(POST_VALIDATION.TITLE.MAX_LENGTH, {
    message: `Title must be at most ${POST_VALIDATION.TITLE.MAX_LENGTH} characters`,
  })
  @ApiProperty({
    example: "Tess of the d'Urbervilles",
    description: "Post title",
    minLength: POST_VALIDATION.TITLE.MIN_LENGTH,
    maxLength: POST_VALIDATION.TITLE.MAX_LENGTH,
    required: true,
    nullable: false,
    type: String,
  })
  title!: string;

  @IsString({
    message: "Description must be a string",
  })
  @IsNotEmpty({
    message: "Description is required",
  })
  @MinLength(POST_VALIDATION.DESCRIPTION.MIN_LENGTH, {
    message: `Description must be at least ${POST_VALIDATION.DESCRIPTION.MIN_LENGTH} characters`,
  })
  @MaxLength(POST_VALIDATION.DESCRIPTION.MAX_LENGTH, {
    message: `Description must be at most ${POST_VALIDATION.DESCRIPTION.MAX_LENGTH} characters`,
  })
  @ApiProperty({
    example: "Umquam viscus consectetur deripio curis.",
    description: "Post description",
    minLength: POST_VALIDATION.DESCRIPTION.MIN_LENGTH,
    maxLength: POST_VALIDATION.DESCRIPTION.MAX_LENGTH,
    required: true,
    nullable: false,
    type: String,
  })
  description!: string;

  @IsInt({
    message: "Author ID must be an integer",
  })
  @IsNotEmpty({
    message: "Author ID is required",
  })
  @Min(1, {
    message: "Author ID must be a positive number",
  })
  @ApiProperty({
    example: 1,
    description: "Post author ID",
    minimum: 1,
    required: true,
    nullable: false,
    type: Number,
  })
  authorId!: number;
}
