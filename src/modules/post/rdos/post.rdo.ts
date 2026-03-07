import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { Post } from "../../../../prisma/generated/client.js";

@ApiSchema({
  name: "PostRdo",
  description: "Post RDO",
})
export class PostRdo implements Post {
  @ApiProperty({
    description: "Post ID",
    required: true,
    nullable: false,
    type: Number,
  })
  id: number;

  @ApiProperty({
    example: "Tess of the d'Urbervilles",
    description: "Post title",
    minLength: 5,
    maxLength: 30,
    required: true,
    nullable: false,
    type: String,
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
  description: string;

  @ApiProperty({
    description: "Post created at",
    required: true,
    nullable: false,
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: "Post updated at",
    required: true,
    nullable: false,
    type: Date,
  })
  updatedAt: Date;

  @ApiProperty({
    example: 1,
    description: "Post author ID",
    minimum: 1,
    required: true,
    nullable: false,
    type: Number,
  })
  authorId: number;

  constructor(
    id: number,
    title: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    authorId: number,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.authorId = authorId;
  }
}
