import { UserDto } from '@modules/users/dto';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';
import { POST_DESCRIPTION_MAX_LENGHT, POST_DESCRIPTION_MIN_LENGHT } from '../posts.constants';

export class PostDto implements Post {
	constructor(partial: Partial<PostDto>) {
		Object.assign(this, partial);
	}

	@ApiProperty({
		example: '550e8400-e29b-41d4-a716-446655440000',
		description: 'Unique identifier of the post',
		format: 'uuid',
		type: String,
	})
	id: string;

	@ApiProperty({
		example: 'New post',
		description: 'Description of the post',
		minLength: POST_DESCRIPTION_MIN_LENGHT,
		maxLength: POST_DESCRIPTION_MAX_LENGHT,
		type: String,
	})
	description: string;

	@ApiProperty({
		example: '2022-02-26T16:37:48.244Z',
		description: 'TImestamp when the post was created',
		type: String,
		format: 'date-time',
		readOnly: true,
	})
	createdAt: Date;

	@ApiProperty({
		example: '2022-02-26T16:37:48.244Z',
		description: 'Timestamp when the post was updated',
		type: String,
		format: 'date-time',
		readOnly: true,
	})
	updatedAt: Date;

	@ApiProperty({
		example: '550e8400-e29b-41d4-a716-446655440000',
		description: 'Unique identifier of the user',
		format: 'uuid',
		type: String,
	})
	userId: string;

	@ApiProperty({
		type: () => UserDto,
		description: 'User who created this post',
		required: false,
	})
	user: UserDto;
}
