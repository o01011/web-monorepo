import { Injectable, NotFoundException } from '@nestjs/common';
import { IUsersRepository } from '@modules/users/interfaces';
import { PrismaService } from '@core/prisma/prisma.service';
import { CreateUserDto, UserDto, UpdateUserDto } from '@modules/users/dto';

@Injectable()
export class UsersRepository implements IUsersRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async create(createUserDto: CreateUserDto): Promise<UserDto> {
		const user = await this.prismaService.user.create({ data: createUserDto });

		return new UserDto(user);
	}

	async findAll(): Promise<UserDto[]> {
		const users = await this.prismaService.user.findMany();

		return users.map(user => new UserDto(user));
	}

	async findOne(id: number): Promise<UserDto | null> {
		const user = await this.prismaService.user.findUnique({ where: { id } });

		if (!user) throw new NotFoundException(`User with id ${id} not found`);

		return new UserDto(user);
	}

	async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
		const user = await this.prismaService.user.update({ where: { id }, data: updateUserDto });

		return new UserDto(user);
	}

	async remove(id: number): Promise<UserDto> {
		const user = await this.prismaService.user.delete({ where: { id } });

		return new UserDto(user);
	}
}
