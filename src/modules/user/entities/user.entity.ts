import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { User } from "../../../../prisma/generated/client.ts";
import { USER_VALIDATION } from "../constants/user-validation.constant.ts";

@ApiSchema({
  name: "UserEntity",
  description: "User model",
})
export class UserEntity implements User {
  @ApiProperty({
    description: "User ID",
    required: true,
    nullable: false,
    type: Number,
  })
  id!: number;

  @ApiProperty({
    example: "Eldred_Ondricka",
    description: "Unique username",
    minLength: USER_VALIDATION.USERNAME.MIN_LENGTH,
    maxLength: USER_VALIDATION.USERNAME.MAX_LENGTH,
    required: true,
    nullable: false,
    type: String,
  })
  username!: string;

  @ApiProperty({
    example: "Paige",
    description: "User first name",
    minLength: USER_VALIDATION.FIRSTNAME.MIN_LENGTH,
    maxLength: USER_VALIDATION.FIRSTNAME.MAX_LENGTH,
    required: true,
    nullable: false,
    type: String,
  })
  firstName!: string;

  @ApiProperty({
    example: "Altenwerth",
    description: "User last name",
    minLength: USER_VALIDATION.LASTNAME.MIN_LENGTH,
    maxLength: USER_VALIDATION.LASTNAME.MAX_LENGTH,
    required: true,
    nullable: false,
    type: String,
  })
  lastName!: string;

  @ApiProperty({
    example: "Horacio4@hotmail.com",
    description: "user email",
    required: true,
    nullable: false,
    type: String,
  })
  email!: string;

  @ApiProperty({
    description: "User created at",
    required: true,
    nullable: false,
    type: Date,
  })
  createAt!: Date;

  @ApiProperty({
    description: "User updated at",
    required: true,
    nullable: false,
    type: Date,
  })
  updatedAt!: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
