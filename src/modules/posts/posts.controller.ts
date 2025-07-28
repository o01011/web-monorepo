import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostsService } from '@modules/posts/posts.service';
import { CreatePostDto, PostDto, UpdatePostDto } from '@modules/posts/dto';

// TODO: add swagger responses docs
@Controller('posts')
@ApiTags('Posts')
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@Post()
	create(@Body() createPostDto: CreatePostDto): Promise<PostDto> {
		return this.postsService.create(createPostDto);
	}

	@Get(':id')
	findOne(@Param('id') id: number): Promise<PostDto> {
		return this.postsService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto): Promise<PostDto> {
		return this.postsService.update(id, updatePostDto);
	}

	@Delete(':id')
	remove(@Param('id') id: number): Promise<PostDto> {
		return this.postsService.remove(id);
	}
}
