import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import type { User } from "../../../../prisma/generated/client.js";

@ApiSchema({
	description: "User RDO",
	name: "UserRdo",
})
export class UserRdo implements User {
	@ApiProperty({
		description: "User ID",
		nullable: false,
		required: true,
		type: Number,
	})
	id: number;

	@ApiProperty({
		description: "Unique username",
		example: "Eldred_Ondricka",
		maxLength: 15,
		minLength: 5,
		nullable: false,
		required: true,
		type: String,
	})
	username: string;

	@ApiProperty({
		description: "User first name",
		example: "Paige",
		maxLength: 30,
		minLength: 5,
		nullable: false,
		required: true,
		type: String,
	})
	firstName: string;

	@ApiProperty({
		description: "User last name",
		example: "Altenwerth",
		maxLength: 30,
		minLength: 5,
		nullable: false,
		required: true,
		type: String,
	})
	lastName: string;

	@ApiProperty({
		description: "User email",
		example: "Horacio4@hotmail.com",
		nullable: false,
		required: true,
		type: String,
	})
	email: string;

	@Exclude()
	@ApiProperty({
		description: "User password",
		example: "",
		nullable: false,
		required: true,
		type: String,
	})
	password: string;

	@ApiProperty({
		description: "User created at",
		example: "",
		nullable: false,
		required: true,
		type: Date,
	})
	createdAt: Date;

	@ApiProperty({
		description: "User updated at",
		example: "",
		nullable: false,
		required: true,
		type: Date,
	})
	updatedAt: Date;

	constructor(id: number, username: string, firstName: string, lastName: string, email: string, password: string, createdAt: Date, updatedAt: Date) {
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
