import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { USER_NAME_MAX_LENGTH, USER_NAME_MIN_LENGTH } from '../user.constants';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsString()
	@IsOptional()
	@ApiProperty({
		required: false,
		example: 'New John Doe',
		description: 'Name of the new user',
		minLength: USER_NAME_MIN_LENGTH,
		maxLength: USER_NAME_MAX_LENGTH,
	})
	name?: string;

	@IsString()
	@IsOptional()
	@ApiProperty({
		required: false,
		example: 'newjohndoe@gmail.com',
		description: 'Email of new user',
		format: 'email',
		maxLength: USER_NAME_MAX_LENGTH,
		type: String,
	})
	email?: string;
}
