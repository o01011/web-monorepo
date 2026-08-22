import { ApiProperty } from "@nestjs/swagger";

export class AuthRdo {
	@ApiProperty({
		example: "",
		name: "accessToken",
		nullable: false,
		required: true,
		type: String,
	})
	accessToken: string;

	constructor(accessToken: string) {
		this.accessToken = accessToken;
	}
}
