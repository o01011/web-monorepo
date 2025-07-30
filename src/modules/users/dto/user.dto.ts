import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { USER_NAME_MAX_LENGTH, USER_NAME_MIN_LENGTH } from '../users.constants';

export class UserDto implements User {
	constructor(partial: Partial<UserDto>) {
		Object.assign(this, partial);
	}

	@ApiProperty({
		example: '550e8400-e29b-41d4-a716-446655440000',
		description: 'Unique identifier of the user',
		format: 'uuid',
		type: String,
	})
	id: string;

	@ApiProperty({
		example: 'John Doe',
		description: 'Name of the user',
		minLength: USER_NAME_MIN_LENGTH,
		maxLength: USER_NAME_MAX_LENGTH,
		type: String,
	})
	name: string;

	@ApiProperty({
		example: 'johndoe@gmail.com',
		description: 'Email of user',
		format: 'email',
		maxLength: USER_NAME_MAX_LENGTH,
		type: String,
	})
	email: string;

	@ApiProperty({
		example: '2022-02-26T16:37:48.244Z',
		description: 'Create at date time',
		type: String,
		format: 'date-time',
	})
	createdAt: Date;

	@Exclude()
	@ApiProperty({
		example: '2022-02-27T10:15:30.000Z',
		description: 'Timestamp when the user was last updated',
		type: String,
		format: 'date-time',
		readOnly: true,
	})
	updatedAt: Date;
}
