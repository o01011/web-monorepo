import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { UserId } from "../../common/decorators/user-id.decorator.js";
import { JwtGuard } from "../../common/guards/jwt.guard.js";
import { CreatePostDto } from "./dtos/create-post.dto.js";
import { UpdatePostDto } from "./dtos/update-post.dto.js";
import { PostService } from "./post.service.js";
import { PostRdo } from "./rdos/post.rdo.js";

@ApiTags("Posts")
@Controller("posts")
@UseGuards(JwtGuard)
export class PostController {
	constructor(@Inject(PostService) private readonly postService: PostService) {}

	@Post()
	@ApiBody({
		type: CreatePostDto,
	})
	@ApiOperation({
		summary: "Create new post",
	})
	create(@UserId() userId: number, @Body() createPostDto: CreatePostDto): Promise<PostRdo> {
		return this.postService.create(createPostDto, userId);
	}

	@Get()
	@ApiOperation({
		summary: "Find all posts",
	})
	@ApiOkResponse({
		type: [PostRdo],
	})
	findAll(@UserId() userId: number): Promise<PostRdo[]> {
		return this.postService.findAll(userId);
	}

	@Get(":id")
	@ApiParam({
		description: "Post ID",
		name: "id",
		type: Number,
	})
	@ApiOperation({
		summary: "Find one post by ID",
	})
	findOne(@UserId() userId: number, @Param("id", ParseIntPipe) id: number): Promise<PostRdo | null> {
		return this.postService.findOne(id, userId);
	}

	@Patch(":id")
	@ApiParam({
		description: "Post ID",
		name: "id",
		type: Number,
	})
	@ApiBody({
		type: UpdatePostDto,
	})
	@ApiOperation({
		summary: "Update post by post ID",
	})
	update(@UserId() userId: number, @Param("id", ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto): Promise<PostRdo> {
		return this.postService.update(id, userId, updatePostDto);
	}

	@Delete(":id")
	@ApiParam({
		description: "Post ID",
		name: "id",
		type: Number,
	})
	@ApiOperation({
		summary: "Remove post by ID",
	})
	remove(@UserId() userId: number, @Param("id", ParseIntPipe) id: number): Promise<PostRdo> {
		return this.postService.remove(id, userId);
	}
}
