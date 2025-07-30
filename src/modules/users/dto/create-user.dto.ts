import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { USER_NAME_MAX_LENGTH, USER_NAME_MIN_LENGTH } from '../users.constants';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'John Doe',
		description: 'Name of the user',
		minLength: USER_NAME_MIN_LENGTH,
		maxLength: USER_NAME_MAX_LENGTH,
		type: String,
	})
	name: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'johndoe@gmail.com',
		description: 'Email of the user',
		format: 'email',
		maxLength: 255,
		type: String,
	})
	email: string;
}
