import { ApiProperty } from "@nestjs/swagger";

export class AuthRdo {
  @ApiProperty({
    name: "accessToken",
    example: "",
    nullable: false,
    required: true,
    type: String,
  })
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
