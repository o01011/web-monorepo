// TODO: add posiible responses for swagger docs
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
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { UserEntity } from "./entities/user.entity.ts";

@Controller("users")
@ApiTags("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: "Create new user",
  })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: "Find all users",
  })
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Find one user by ID",
  })
  @ApiParam({ name: "id", type: Number, description: "User ID" })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<UserEntity | null> {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update user by ID",
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ name: "id", type: Number, description: "User ID" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Remove user by ID",
  })
  @ApiParam({ name: "id", type: Number, description: "User ID" })
  remove(@Param("id", ParseIntPipe) id: number): Promise<UserEntity> {
    return this.userService.remove(id);
  }
}
