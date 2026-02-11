import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../../../prisma/generated/client.ts";

export class UserEntity implements User {
  @ApiProperty({ required: true, nullable: false })
  id: number;

  @ApiProperty({ required: true, nullable: false })
  username: string;

  @ApiProperty({ required: true, nullable: false })
  firstName: string;

  @ApiProperty({ required: true, nullable: false })
  lastName: string;

  @ApiProperty({ required: true, nullable: false })
  email: string;

  @ApiProperty({ required: true, nullable: false })
  createAt: Date;

  @ApiProperty({ required: true, nullable: false })
  updatedAt: Date;

  constructor(
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.createAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
