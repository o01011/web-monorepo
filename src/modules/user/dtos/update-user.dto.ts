import { ApiSchema, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto.ts";

@ApiSchema({
  name: "UpdateUserDto",
  description: "Update user data transfer object",
})
export class UpdateUserDto extends PartialType(CreateUserDto) {}
