import { Injectable, Logger } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto.ts";
import { UpdateUserDto } from "./dto/update-user.dto.ts";
import { PrismaService } from "../../core/prisma/prisma.service.ts";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return "This action adds a new user";
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
