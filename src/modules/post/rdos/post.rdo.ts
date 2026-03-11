import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import type { Post } from "../../../../prisma/generated/client.js";

@ApiSchema({
	description: "Post RDO",
	name: "PostRdo",
})
export class PostRdo implements Post {
	@ApiProperty({
		description: "Post ID",
		nullable: false,
		required: true,
		type: Number,
	})
	id: number;

	@ApiProperty({
		description: "Post title",
		example: "Tess of the d'Urbervilles",
		maxLength: 30,
		minLength: 5,
		nullable: false,
		required: true,
		type: String,
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
	description: string;

	@ApiProperty({
		description: "Post created at",
		nullable: false,
		required: true,
		type: Date,
	})
	createdAt: Date;

	@ApiProperty({
		description: "Post updated at",
		nullable: false,
		required: true,
		type: Date,
	})
	updatedAt: Date;

	@ApiProperty({
		description: "Post author ID",
		example: 1,
		minimum: 1,
		nullable: false,
		required: true,
		type: Number,
	})
	authorId: number;

	constructor(id: number, title: string, description: string, createdAt: Date, updatedAt: Date, authorId: number) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.authorId = authorId;
	}
}
