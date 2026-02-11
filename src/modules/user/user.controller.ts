import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { UserService } from "./user.service.ts";
import { CreateUserDto } from "./dtos/create-user.dto.ts";
import { UpdateUserDto } from "./dtos/update-user.dto.ts";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserEntity } from "./entities/user.entity.ts";

@Controller("user")
@ApiTags("Users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<UserEntity | null> {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  @ApiOkResponse({ type: UserEntity })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  @ApiOkResponse({ type: UserEntity })
  remove(@Param("id", ParseIntPipe) id: number): Promise<UserEntity> {
    return this.userService.remove(id);
  }
}
