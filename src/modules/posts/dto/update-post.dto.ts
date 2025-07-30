import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { POST_DESCRIPTION_MAX_LENGHT, POST_DESCRIPTION_MIN_LENGHT } from '../posts.constants';

export class UpdatePostDto {
	@IsOptional()
	@IsString()
	@ApiProperty({
		example: 'New post',
		description: 'Description of the new post',
		minLength: POST_DESCRIPTION_MIN_LENGHT,
		maxLength: POST_DESCRIPTION_MAX_LENGHT,
		type: String,
	})
	description?: string;
}
