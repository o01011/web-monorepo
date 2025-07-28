import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// TODO: add completed api property args
export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	@ApiProperty({ required: false })
	name?: string;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	@ApiProperty({ required: false })
	email?: string;
}
