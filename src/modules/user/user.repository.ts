import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { PrismaService } from "../../core/prisma/prisma.service.ts";
import { CreateUserDto } from "./dtos/create-user.dto.ts";
import { UserEntity } from "./entities/user.entity.ts";
import { UpdateUserDto } from "./dtos/update-user.dto.ts";

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const user = await this.prismaService.user.create({
        data: createUserDto,
      });

      return user;
    } catch (e) {
      this.logger.error(`Error during create new user: ${e}`);
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const users = await this.prismaService.user.findMany();

      return users;
    } catch (e) {
      this.logger.error(`Error during find all users: ${e}`);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number): Promise<UserEntity | null> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });

      return user;
    } catch (e) {
      this.logger.error(`Error during find one user: ${e}`);
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    try {
      const user = await this.prismaService.user.update({
        where: { id },
        data: updateUserDto,
      });

      return user;
    } catch (e) {
      this.logger.error(`Error during update user: ${e}`);
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number): Promise<UserEntity> {
    try {
      const user = await this.prismaService.user.delete({
        where: { id },
      });

      return user;
    } catch (e) {
      this.logger.error(`Error during remove user: ${e}`);
      throw new InternalServerErrorException();
    }
  }
}
