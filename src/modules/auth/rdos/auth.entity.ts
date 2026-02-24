import { ApiProperty } from "@nestjs/swagger";

export class AuthRdo {
  @ApiProperty({
    name: "accessToken",
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTc3MTQzMjkyNywiZXhwIjoxNzcxNDMzMjI3fQ.bwStd_0JJS5KvxQqsrB6Ygb00wC6r-ncBL6hddW39VI",
    nullable: false,
    required: true,
    type: String,
  })
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
