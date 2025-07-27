import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from '@modules/users/dto';
import { UsersRepository } from '@modules/users/users.repository';
import { KafkaProducerService } from '@core/kafka/producer/kafka-producer.service';

@Injectable()
export class UsersService {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly kafkaProducerService: KafkaProducerService,
	) {}

	async create(createUserDto: CreateUserDto): Promise<UserDto> {
		this.kafkaProducerService.produce({
			topic: 'create-user',
			messages: [{ value: JSON.stringify(createUserDto) }],
		});

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
