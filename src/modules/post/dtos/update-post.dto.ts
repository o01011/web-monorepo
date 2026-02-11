import { PartialType } from "@nestjs/swagger";
import { CreatePostDto } from "./create-post.dto.ts";

export class UpdatePostDto extends PartialType(CreatePostDto) {}
