import { CreateUserDto, UserDto, UpdateUserDto } from '@modules/users/dto';

export interface IUsersRepository {
	create(createUserDto: CreateUserDto): Promise<UserDto>;
	findAll(): Promise<UserDto[]>;
	findOne(userId: string): Promise<UserDto>;
	update(userId: string, updateUserDto: UpdateUserDto): Promise<UserDto>;
	remove(userId: string): Promise<UserDto>;
}
