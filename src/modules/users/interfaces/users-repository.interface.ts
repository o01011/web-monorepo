import { CreateUserDto, UserDto, UpdateUserDto } from '@modules/users/dto';

export interface IUsersRepository {
	create(createUserDto: CreateUserDto): Promise<UserDto>;
	findAll(): Promise<UserDto[]>;
	findOne(id: number): Promise<UserDto | null>;
	update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto>;
	remove(id: number): Promise<UserDto>;
}
