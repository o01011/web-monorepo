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
  @ApiProperty({
    example: "Tess of the d'Urbervilles",
    description: "Post title",
    minLength: POST_VALIDATION.TITLE.MIN_LENGTH,
    maxLength: POST_VALIDATION.TITLE.MAX_LENGTH,
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
  @MinLength(POST_VALIDATION.TITLE.MIN_LENGTH, {
    message: "",
  })
  @MaxLength(POST_VALIDATION.TITLE.MAX_LENGTH, {
    message: "",
  })
  title: string;

  @ApiProperty({
    example: "Umquam viscus consectetur deripio curis.",
    description: "Post description",
    minLength: POST_VALIDATION.DESCRIPTION.MIN_LENGTH,
    maxLength: POST_VALIDATION.DESCRIPTION.MAX_LENGTH,
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
  @MinLength(POST_VALIDATION.DESCRIPTION.MIN_LENGTH, {
    message: "",
  })
  @MaxLength(POST_VALIDATION.DESCRIPTION.MAX_LENGTH, {
    message: "",
  })
  description: string;

  @ApiProperty({
    example: 1,
    description: "Post author ID",
    minimum: 1,
    required: true,
    nullable: false,
    type: Number,
  })
  @IsInt({
    message: "",
  })
  @IsNotEmpty({
    message: "",
  })
  @Min(1, {
    message: "",
  })
  authorId: number;

  constructor(title: string, description: string, authorId: number) {
    this.title = title;
    this.description = description;
    this.authorId = authorId;
  }
}
