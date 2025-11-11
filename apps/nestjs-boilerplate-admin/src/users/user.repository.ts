import { Injectable, Logger } from '@nestjs/common';
import { UpdateUserDto, CreateUserDto, UserDto } from './dto';
import { IUsersRepository } from './interfaces';
import { PrismaService } from '@libs/core/prisma/prisma.service';

@Injectable()
export class UserRepository implements IUsersRepository {
	private readonly logger = new Logger(UserRepository.name);

	constructor(private readonly prismaService: PrismaService) {}

	async create(createUserDto: CreateUserDto): Promise<UserDto> {
		try {
			const user = await this.prismaService.user.create({ data: createUserDto });
			return new UserDto(user);
		} catch (e) {
			this.logger.error(`Failed to create user: ${e}`);
			throw e;
		}
	}

	async findAll(): Promise<UserDto[]> {
		const users = await this.prismaService.user.findMany();

		return users.map(user => new UserDto(user));
	}

	async findOne(userId: string): Promise<UserDto | null> {
		const user = await this.prismaService.user.findUnique({ where: { id: userId } });

		if (!user) return null;

		return new UserDto(user);
	}

	async update(userId: string, updateUserDto: UpdateUserDto): Promise<UserDto | null> {
		try {
			const user = await this.prismaService.user.update({
				where: { id: userId },
				data: updateUserDto,
			});

			if (!user) return null;

			return new UserDto(user);
		} catch (e) {
			this.logger.error(`Failed to update user ${userId}: ${e}`);
			throw e;
		}
	}

	async remove(userId: string): Promise<UserDto | null> {
		try {
			const user = await this.prismaService.user.delete({ where: { id: userId } });

			if (!user) return null;

			return new UserDto(user);
		} catch (e) {
			this.logger.error(`Failed to delete user ${userId}: ${e}`);
			throw e;
		}
	}
}
