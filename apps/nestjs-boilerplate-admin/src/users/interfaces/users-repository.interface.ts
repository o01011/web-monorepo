import { CreateUserDto, UpdateUserDto, UserDto } from '../dto';

export interface IUsersRepository {
	create(createUserDto: CreateUserDto): Promise<UserDto>;
	findAll(): Promise<UserDto[]>;
	findOne(userId: string): Promise<UserDto | null>;
	update(userId: string, updateUserDto: UpdateUserDto): Promise<UserDto | null>;
	remove(userId: string): Promise<UserDto | null>;
}
