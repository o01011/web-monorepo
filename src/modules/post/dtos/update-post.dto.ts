import { ApiSchema, OmitType, PartialType } from "@nestjs/swagger";
import { CreatePostDto } from "./create-post.dto.ts";

@ApiSchema({
  name: "UpdatePostDto",
  description: "Update post data transfer object",
})
export class UpdatePostDto extends PartialType(
  OmitType(CreatePostDto, ["authorId"] as const),
) {}
