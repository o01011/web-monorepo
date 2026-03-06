import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

@ApiSchema({
  name: "CreatePostDto",
  description: "Create new post data transfer object",
})
export class CreatePostDto {
  @ApiProperty({
    example: "Tess of the d'Urbervilles",
    description: "Post title",
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
  title: string;

  @ApiProperty({
    example: "Umquam viscus consectetur deripio curis.",
    description: "Post description",
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
    message: i18nValidationMessage("dtos-validation.INT"),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("dtos-validation.EMPTY"),
  })
  authorId: number;

  constructor(title: string, description: string, authorId: number) {
    this.title = title;
    this.description = description;
    this.authorId = authorId;
  }
}
