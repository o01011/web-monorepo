import { ApiProperty } from '@nestjs/swagger';
import { POST_DESCRIPTION_MAX_LENGHT, POST_DESCRIPTION_MIN_LENGHT } from '../post.constants';
import { Exclude } from 'class-transformer';
import { UserDto } from '../../users/dto';
import { Post } from '@prisma/generated/client';

export class PostDto implements Post {
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

	@Exclude()
	@ApiProperty({
		example: '2022-02-26T16:37:48.244Z',
		description: 'TImestamp when the post was created',
		type: String,
		format: 'date-time',
		readOnly: true,
	})
	createdAt: Date;

	@Exclude()
	@ApiProperty({
		example: '2022-02-26T16:37:48.244Z',
		description: 'Timestamp when the post was updated',
		type: String,
		format: 'date-time',
		readOnly: true,
	})
	updatedAt: Date;

	@Exclude()
	@ApiProperty({
		example: '550e8400-e29b-41d4-a716-446655440000',
		description: 'Unique identifier of the user',
		format: 'uuid',
		type: String,
	})
	userId: string;

	@Exclude()
	@ApiProperty({
		type: () => UserDto,
		description: 'User who created this post',
		required: false,
	})
	user?: UserDto;

	constructor(postDto: PostDto) {
		Object.assign(this, postDto);
	}
}
