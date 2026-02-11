import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ required: true, nullable: false })
  username: string;

  @ApiProperty({ required: true, nullable: false })
  firstName: string;

  @ApiProperty({
    required: true,
    nullable: false,
  })
  lastName: string;

  @ApiProperty({
    required: true,
    nullable: false,
  })
  email: string;

  constructor(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
  ) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
