import { UserDto } from '@modules/users/dto';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';

// TODO: add completed api property args
export class PostDto implements Post {
	constructor(partial: Partial<PostDto>) {
		Object.assign(this, partial);
	}

	@ApiProperty({
		example: 1,
		description: 'Unique identifier of the post',
	})
	id: number;

	@ApiProperty({
		example: 'New post',
		description: 'Description of the post',
	})
	description: string;

	@ApiProperty({
		example: '2022-02-26T16:37:48.244Z',
		description: 'Created at date time',
	})
	createdAt: Date;

	@ApiProperty({
		example: '2022-02-26T16:37:48.244Z',
		description: 'Updated at date time',
	})
	updatedAt: Date;

	@ApiProperty({
		example: 1,
		description: 'Unique identifier of the user',
	})
	userId: number;

	@ApiProperty({
		type: () => UserDto,
		description: 'User details',
	})
	user: UserDto;
}
