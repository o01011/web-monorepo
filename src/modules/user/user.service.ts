import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto.ts";
import { UpdateUserDto } from "./dtos/update-user.dto.ts";
import { UserRepository } from "./user.repository.ts";
import { UserEntity } from "./entities/user.entity.ts";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      return this.userRepository.create(createUserDto);
    } catch (e) {
      this.logger.error(`Error during create user: ${e}`);
      throw new InternalServerErrorException();
    }
  }

  findAll(): Promise<UserEntity[]> {
    try {
      return this.userRepository.findAll();
    } catch (e) {
      this.logger.error(`Error during find all users: ${e}`);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number): Promise<UserEntity | null> {
    try {
      const user = await this.userRepository.findOne(id);

      if (!user) throw new NotFoundException(`User with id ${id} not found.`);

      return user;
    } catch (e) {
      this.logger.error(`Error during find one user: ${e}`);
      throw new InternalServerErrorException();
    }
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    try {
      return this.userRepository.update(id, updateUserDto);
    } catch (e) {
      this.logger.error(`Error during update user: ${e}`);
      throw new InternalServerErrorException();
    }
  }

  remove(id: number): Promise<UserEntity> {
    try {
      return this.userRepository.remove(id);
    } catch (e) {
      this.logger.error(`Error during remove user: ${e}`);
      throw new InternalServerErrorException();
    }
  }
}
