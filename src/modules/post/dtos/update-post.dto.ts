import { ApiSchema, PartialType } from "@nestjs/swagger";
import { CreatePostDto } from "./create-post.dto.js";

@ApiSchema({
  name: "UpdatePostDto",
  description: "Update post data transfer object",
})
export class UpdatePostDto extends PartialType(CreatePostDto) {}
