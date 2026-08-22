import { ApiSchema, PartialType } from "@nestjs/swagger";
import { CreatePostDto } from "./create-post.dto.js";

@ApiSchema({
	description: "Update post data transfer object",
	name: "UpdatePostDto",
})
export class UpdatePostDto extends PartialType(CreatePostDto) {}
