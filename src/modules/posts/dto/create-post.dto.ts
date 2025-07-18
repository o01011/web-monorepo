import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';

export class CreatePostDto implements Post {
	@ApiProperty()
	id: number;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;

	@ApiProperty()
	authorId: number;
}
