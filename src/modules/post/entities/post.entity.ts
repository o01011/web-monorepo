import { ApiProperty } from "@nestjs/swagger";
import { Post } from "../../../../prisma/generated/client.ts";

export class PostEntity implements Post {
  @ApiProperty({ required: true, nullable: false })
  id!: number;

  @ApiProperty({ required: true, nullable: false })
  title!: string;

  @ApiProperty({ required: true, nullable: false })
  description!: string;

  @ApiProperty({ required: true, nullable: false })
  createdAt!: Date;

  @ApiProperty({ required: true, nullable: false })
  updatedAt!: Date;

  @ApiProperty({ required: true, nullable: false })
  authorId!: number;

  constructor(partial: Partial<PostEntity>) {
    Object.assign(this, partial);
  }
}
