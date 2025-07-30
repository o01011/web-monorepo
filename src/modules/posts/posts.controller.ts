import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PostsService } from '@modules/posts/posts.service';
import { CreatePostDto, PostDto, UpdatePostDto } from '@modules/posts/dto';

// TODO: add swagger responses docs
@Controller('posts')
@ApiTags('Posts')
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@Post(':userId')
	@ApiOperation({
		summary: 'Create a new post',
		description: 'Create a new post with the provided data',
	})
	@ApiParam({
		name: 'userId',
		type: String,
		description: 'User ID',
		example: '550e8400-e29b-41d4-a716-446655440000',
	})
	@ApiBody({
		type: CreatePostDto,
	})
	create(
		@Param('userId', ParseUUIDPipe) userId: string,
		@Body() createPostDto: CreatePostDto,
	): Promise<PostDto> {
		return this.postsService.create(userId, createPostDto);
	}

	@Get(':postId')
	@ApiOperation({
		summary: 'Get post by post id',
		description: 'Retrieves a single post by post id',
	})
	@ApiParam({
		name: 'postId',
		type: String,
		description: 'Post id',
		example: '550e8400-e29b-41d4-a716-446655440000',
	})
	findOne(@Param('postId', ParseUUIDPipe) postId: string): Promise<PostDto> {
		return this.postsService.findOne(postId);
	}

	@Patch(':postId')
	@ApiOperation({
		summary: 'Update a post',
		description: 'Updates an existing post with new data',
	})
	@ApiParam({
		name: 'postId',
		type: String,
		description: 'Post id',
		example: '550e8400-e29b-41d4-a716-446655440000',
	})
	@ApiBody({
		type: UpdatePostDto,
	})
	update(
		@Param('postId', ParseUUIDPipe) postId: string,
		@Body() updatePostDto: UpdatePostDto,
	): Promise<PostDto> {
		return this.postsService.update(postId, updatePostDto);
	}

	@Delete(':postId')
	@ApiParam({
		name: 'postId',
		type: String,
		description: 'Post id',
		example: '550e8400-e29b-41d4-a716-446655440000',
	})
	remove(@Param('postId', ParseUUIDPipe) postId: string): Promise<PostDto> {
		return this.postsService.remove(postId);
	}
}
