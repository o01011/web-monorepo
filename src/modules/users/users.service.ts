import { PrismaService } from '@core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		const user = await this.prismaService.user.create({ data: createUserDto });

		return new UserEntity(user);
	}

	async findAll() {
		const users = await this.prismaService.user.findMany();

		return users.map(user => new UserEntity(user));
	}

	async findOne(id: number) {
		const user = await this.prismaService.user.findUnique({ where: { id } });

		return new UserEntity(user);
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		const user = await this.prismaService.user.update({ where: { id }, data: updateUserDto });

		return new UserEntity(user);
	}

	async remove(id: number) {
		const user = await this.prismaService.user.delete({ where: { id } });

		return new UserEntity(user);
	}
}
