import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../../core/prisma/prisma.service.ts";
import { CreateUserDto } from "./dto/create-user.dto.ts";
import { UserEntity } from "./entities/user.entity.ts";

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
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

  async findOne(id: number): Promise<UserEntity> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });

      if (!user) throw new NotFoundException(`User with id ${id} not found.`);

      return user;
    } catch (e) {
      this.logger.error(`Error during find one user: ${e}`);
      throw new InternalServerErrorException();
    }
  }

  // update(id: number, updateUserDto: UpdateUserDto) {}

  // remove(id: number) {}
}
