import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from '@modules/users/dto';
import { UsersRepository } from '@modules/users/users.repository';
// import { KafkaProducerService } from '@core/kafka/producer/kafka-producer.service';

@Injectable()
export class UsersService {
	constructor(
		private readonly usersRepository: UsersRepository,
		// private readonly kafkaProducerService: KafkaProducerService,
	) {}

	async create(createUserDto: CreateUserDto): Promise<UserDto> {
		return this.usersRepository.create(createUserDto);
	}

	async findAll(): Promise<UserDto[]> {
		return this.usersRepository.findAll();
	}

	async findById(userId: string): Promise<UserDto> {
		return this.usersRepository.findOne(userId);
	}

	async update(userId: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
		return this.usersRepository.update(userId, updateUserDto);
	}

	async remove(userId: string): Promise<UserDto> {
		return this.usersRepository.remove(userId);
	}
}
