import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from '@modules/users/dto';
import { UsersRepository } from '@modules/users/users.repository';

@Injectable()
export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	async create(createUserDto: CreateUserDto): Promise<UserDto> {
		return this.usersRepository.create(createUserDto);
	}

	async findAll(): Promise<UserDto[]> {
		return this.usersRepository.findAll();
	}

	async findOne(id: number): Promise<UserDto> {
		return this.usersRepository.findOne(id);
	}

	async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
		return this.usersRepository.update(id, updateUserDto);
	}

	async remove(id: number): Promise<UserDto> {
		return this.usersRepository.remove(id);
	}
}
