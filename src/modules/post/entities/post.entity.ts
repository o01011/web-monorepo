import { ApiProperty } from "@nestjs/swagger";
import { Post } from "../../../../prisma/generated/client.ts";
import { POST_VALIDATION } from "../constants/post-validation.constant.ts";

export class PostEntity implements Post {
  @ApiProperty({ description: "Post ID", required: true, nullable: false })
  id!: number;

  @ApiProperty({
    example: "Tess of the d'Urbervilles",
    description: "Post title",
    minLength: POST_VALIDATION.TITLE.MIN_LENGTH,
    maxLength: POST_VALIDATION.TITLE.MAX_LENGTH,
    required: true,
    nullable: false,
  })
  title!: string;

  @ApiProperty({
    example: "Umquam viscus consectetur deripio curis.",
    description: "Post description",
    minLength: POST_VALIDATION.DESCRIPTION.MIN_LENGTH,
    maxLength: POST_VALIDATION.DESCRIPTION.MAX_LENGTH,
    required: true,
    nullable: false,
  })
  description!: string;

  @ApiProperty({
    description: "Post created at",
    required: true,
    nullable: false,
  })
  createdAt!: Date;

  @ApiProperty({
    description: "Post updated at",
    required: true,
    nullable: false,
  })
  updatedAt!: Date;

  @ApiProperty({
    example: 1,
    description: "Post author ID",
    minimum: 1,
    required: true,
    nullable: false,
  })
  authorId!: number;

  constructor(partial: Partial<PostEntity>) {
    Object.assign(this, partial);
  }
}
