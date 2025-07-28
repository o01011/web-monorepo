import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

// TODO: add api property args
export class UpdatePostDto {
	@IsOptional()
	@IsString()
	@ApiProperty()
	description: string;
}
