import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
	Headers,
} from '@nestjs/common';
import {
	ApiBody,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { ApiUserIdHeader, UserId } from '@libs/common/decorators';
import { UpdatePostDto, CreatePostDto, PostDto } from './dto';
import { PostService } from './post.service';

@Controller('posts')
@ApiTags('Posts')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Post()
	@ApiOperation({
		summary: 'Create a new post',
		description: 'Create a new post with the provided data',
	})
	@ApiCreatedResponse({
		description: 'Create new post by userId',
	})
	@ApiNotFoundResponse({
		description: 'User not found',
	})
	@ApiBody({
		type: CreatePostDto,
	})
	@ApiUserIdHeader()
	create(@UserId() userId: string, @Body() createPostDto: CreatePostDto): Promise<PostDto> {
		return this.postService.create(userId, createPostDto);
	}

	@Get()
	@ApiOperation({
		summary: 'List of all posts by userId',
		description: 'List of all posts by userId description',
	})
	@ApiOkResponse({
		description: 'List of all posts by userId',
	})
	@ApiNotFoundResponse({
		description: 'User not found',
	})
	@ApiUserIdHeader()
	findAllByUserId(@Headers('x-user-id') userId: string): Promise<PostDto[]> {
		return this.postService.findAllByUserId(userId);
	}

	@Get(':postId')
	@ApiOperation({
		summary: 'Get post by post id',
		description: 'Retrieves a single post by post id',
	})
	@ApiOkResponse({
		description: 'Get post by postId',
	})
	@ApiNotFoundResponse({
		description: 'Post not found',
	})
	@ApiParam({
		name: 'postId',
		type: String,
		description: 'Post id',
		example: '550e8400-e29b-41d4-a716-446655440000',
		required: true,
	})
	@ApiUserIdHeader()
	findOne(
		@Headers('x-user-id') userId: string,
		@Param('postId', ParseUUIDPipe) postId: string,
	): Promise<PostDto> {
		return this.postService.findById(userId, postId);
	}

	@Patch(':postId')
	@ApiOperation({
		summary: 'Update a post',
		description: 'Updates an existing post with new data',
	})
	@ApiOkResponse({
		description: 'Patch post by id',
	})
	@ApiNotFoundResponse({
		description: 'Post by id not found',
	})
	@ApiParam({
		name: 'postId',
		type: String,
		description: 'Post id',
		example: '550e8400-e29b-41d4-a716-446655440000',
		required: true,
	})
	@ApiBody({
		type: UpdatePostDto,
	})
	@ApiUserIdHeader()
	update(
		@Headers('x-user-id') userId: string,
		@Param('postId', ParseUUIDPipe) postId: string,
		@Body() updatePostDto: UpdatePostDto,
	): Promise<PostDto> {
		return this.postService.update(userId, postId, updatePostDto);
	}

	@Delete(':postId')
	@ApiOperation({
		summary: 'Delete post by postId',
		description: 'Deletes a post by id',
	})
	@ApiOkResponse({
		description: 'Post deleted by id',
	})
	@ApiNotFoundResponse({
		description: 'Post by id not found',
	})
	@ApiParam({
		name: 'postId',
		type: String,
		description: 'Post id',
		example: '550e8400-e29b-41d4-a716-446655440000',
		required: true,
	})
	@ApiUserIdHeader()
	remove(
		@Headers('x-user-id') userId: string,
		@Param('postId', ParseUUIDPipe) postId: string,
	): Promise<PostDto> {
		return this.postService.remove(userId, postId);
	}
}
