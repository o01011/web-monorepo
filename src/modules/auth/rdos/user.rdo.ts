import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { User } from "../../../../prisma/generated/client.js";
import { Exclude } from "class-transformer";

@ApiSchema({
  name: "UserRdo",
  description: "User RDO",
})
export class UserRdo implements User {
  @ApiProperty({
    description: "User ID",
    required: true,
    nullable: false,
    type: Number,
  })
  id: number;

  @ApiProperty({
    example: "Eldred_Ondricka",
    description: "Unique username",
    minLength: 5,
    maxLength: 15,
    required: true,
    nullable: false,
    type: String,
  })
  username: string;

  @ApiProperty({
    example: "Paige",
    description: "User first name",
    minLength: 5,
    maxLength: 30,
    required: true,
    nullable: false,
    type: String,
  })
  firstName: string;

  @ApiProperty({
    example: "Altenwerth",
    description: "User last name",
    minLength: 5,
    maxLength: 30,
    required: true,
    nullable: false,
    type: String,
  })
  lastName: string;

  @ApiProperty({
    example: "Horacio4@hotmail.com",
    description: "User email",
    required: true,
    nullable: false,
    type: String,
  })
  email: string;

  @Exclude()
  @ApiProperty({
    example: "",
    description: "User password",
    required: true,
    nullable: false,
    type: String,
  })
  password: string;

  @ApiProperty({
    example: "",
    description: "User created at",
    required: true,
    nullable: false,
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    example: "",
    description: "User updated at",
    required: true,
    nullable: false,
    type: Date,
  })
  updatedAt: Date;

  constructor(
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
