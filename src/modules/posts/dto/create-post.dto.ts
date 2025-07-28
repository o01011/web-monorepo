import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

// TODO: add api property args
export class CreatePostDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	description: string;

	@IsInt()
	@IsNotEmpty()
	@IsPositive()
	@ApiProperty()
	userId: number;
}
