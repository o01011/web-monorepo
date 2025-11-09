import { Injectable, NotFoundException } from '@nestjs/common';
import { IUsersRepository } from '@modules/users/interfaces';
import { PrismaService } from '@core/prisma/prisma.service';
import { CreateUserDto, UserDto, UpdateUserDto } from '@modules/users/dto';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class UsersRepository implements IUsersRepository {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly i18nService: I18nService,
	) {}

	async create(createUserDto: CreateUserDto): Promise<UserDto> {
		const user = await this.prismaService.user.create({ data: createUserDto });
		return new UserDto(user);
	}

	async findAll(): Promise<UserDto[]> {
		const users = await this.prismaService.user.findMany();
		return users.map(user => new UserDto(user));
	}

	async findOne(userId: string): Promise<UserDto> {
		const user = await this.prismaService.user.findUnique({ where: { id: userId } });

		if (!user) {
			throw new NotFoundException(
				this.i18nService.t('users.NOT_FOUND', {
					lang: I18nContext.current().lang,
				}),
			);
		}

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
