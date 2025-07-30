import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { UsersService } from '@modules/users/users.service';
import { UpdateUserDto, CreateUserDto, UserDto } from '@modules/users/dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiOperation({
		summary: 'Create a new user',
		description: 'Create a new user with the provided data',
	})
	@ApiCreatedResponse({
		description: 'The user has been successfully created',
		type: UserDto,
	})
	@ApiBadRequestResponse({
		description: 'Invalid input data',
	})
	@ApiBody({
		type: CreateUserDto,
	})
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get()
	@ApiOperation({
		summary: 'Get all users',
		description: 'Retrieves a list of all users',
	})
	@ApiOkResponse({
		description: 'List of users retrieved successfully',
		type: [UserDto],
	})
	findAll() {
		return this.usersService.findAll();
	}

	@Get(':userId')
	@ApiOperation({
		summary: 'Get a user by ID',
		description: 'Retrieves a single user by their ID',
	})
	@ApiOkResponse({
		description: 'User found and returned',
		type: UserDto,
	})
	@ApiNotFoundResponse({
		description: 'User not found',
	})
	@ApiBadRequestResponse({
		description: 'Invalid user ID format',
	})
	@ApiParam({
		name: 'userId',
		type: String,
		description: 'User ID',
		example: '550e8400-e29b-41d4-a716-446655440000',
	})
	findOne(@Param('userId', ParseUUIDPipe) userId: string) {
		return this.usersService.findOne(userId);
	}

	@Patch(':userId')
	@ApiOperation({
		summary: 'Update a user',
		description: 'Updates an existing user with new data',
	})
	@ApiOkResponse({
		description: 'User updated successfully',
		type: UserDto,
	})
	@ApiNotFoundResponse({
		description: 'User not found',
	})
	@ApiBadRequestResponse({
		description: 'Invalid input data or user ID format',
	})
	@ApiParam({
		name: 'userId',
		type: String,
		description: 'User iD',
		example: '550e8400-e29b-41d4-a716-446655440000',
	})
	@ApiBody({
		type: UpdateUserDto,
	})
	update(@Param('userId', ParseUUIDPipe) userId: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(userId, updateUserDto);
	}

	@Delete(':userId')
	@ApiOperation({
		summary: 'Delete a user',
		description: 'Deletes a user by their ID',
	})
	@ApiOkResponse({
		description: 'User deleted successfully',
	})
	@ApiNotFoundResponse({
		description: 'User not found',
	})
	@ApiBadRequestResponse({
		description: 'Invalid user ID format',
	})
	@ApiParam({
		name: 'userId',
		type: Number,
		description: 'User ID',
		example: 1,
	})
	remove(@Param('userId', ParseUUIDPipe) userId: string) {
		return this.usersService.remove(userId);
	}
}
