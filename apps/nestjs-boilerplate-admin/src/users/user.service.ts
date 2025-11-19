import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDto, CreateUserDto, UpdateUserDto } from './dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@app/i18n/generated/i18n.generated';
// import { KafkaProducerService } from '@core/kafka/producer/kafka-producer.service';

@Injectable()
export class UserService {
	private readonly logger = new Logger(UserService.name);

	constructor(
		private readonly userRepository: UserRepository,
		private readonly i18nService: I18nService<I18nTranslations>,
		// private readonly kafkaProducerService: KafkaProducerService,
	) {}

	async create(createUserDto: CreateUserDto): Promise<UserDto> {
		try {
			const user = this.userRepository.create(createUserDto);

			return user;
		} catch (e) {
			this.logger.error(`Failed to create user: ${e}`);
			throw e;
		}
	}

	async findAll(): Promise<UserDto[]> {
		return this.userRepository.findAll();
	}

	async findById(userId: string): Promise<UserDto> {
		const user = await this.userRepository.findOne(userId);

		if (!user) {
			throw new NotFoundException(
				this.i18nService.t('users.NOT_FOUND', {
					lang: I18nContext.current().lang,
					args: { id: userId },
				}),
			);
		}

		return user;
	}

	async update(userId: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
		try {
			const user = await this.userRepository.findOne(userId);

			if (!user) {
				throw new NotFoundException(
					this.i18nService.t('users.NOT_FOUND', {
						lang: I18nContext.current().lang,
						args: { id: userId },
					}),
				);
			}

			const updatedUser = this.userRepository.update(userId, updateUserDto);

			return updatedUser;
		} catch (e) {
			this.logger.error(`Failed to update user ${userId}: ${e}`);
			throw e;
		}
	}

	async remove(userId: string): Promise<UserDto> {
		try {
			const user = await this.userRepository.findOne(userId);

			if (!user) {
				throw new NotFoundException(
					this.i18nService.t('users.NOT_FOUND', {
						lang: I18nContext.current().lang,
						args: { id: userId },
					}),
				);
			}

			const deletedUser = await this.userRepository.remove(userId);

			return deletedUser;
		} catch (e) {
			this.logger.error(`Failed to delete user ${userId}: ${e}`);
			throw e;
		}
	}
}
