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

	async findOne(userId: string): Promise<UserDto | null> {
		const user = await this.prismaService.user.findUnique({ where: { id: userId } });

		if (!user) throw new NotFoundException(`User with id ${userId} not found`);

		return new UserDto(user);
	}

	async update(userId: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
		const user = await this.prismaService.user.update({
			where: { id: userId },
			data: updateUserDto,
		});

		return new UserDto(user);
	}

	async remove(userId: string): Promise<UserDto> {
		const user = await this.prismaService.user.delete({ where: { id: userId } });

		return new UserDto(user);
	}
}
