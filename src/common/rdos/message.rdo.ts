import { ApiProperty } from "@nestjs/swagger";

export class MessageRdo {
  @ApiProperty({
    name: "message",
    example: "example message",
    nullable: false,
    required: true,
    type: String,
  })
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
