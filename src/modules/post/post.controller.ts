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
  UseGuards,
} from "@nestjs/common";
import { PostService } from "./post.service.ts";
import { CreatePostDto } from "./dtos/create-post.dto.ts";
import { UpdatePostDto } from "./dtos/update-post.dto.ts";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { PostEntity } from "./entities/post.entity.ts";
import { JwtGuard } from "../../common/guards/auth.guard.ts";
import { UserId } from "../../common/decorators/user-id.decorator.ts";

@ApiTags("Posts")
@Controller("posts")
@UseGuards(JwtGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiBody({
    type: CreatePostDto,
  })
  @ApiOperation({
    summary: "Create new post",
  })
  create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postService.create(createPostDto);
  }

  @Get()
  @ApiOperation({
    summary: "Find all posts",
  })
  @ApiOkResponse({
    type: [PostEntity],
  })
  findAll(@UserId() userId: number): Promise<PostEntity[]> {
    return this.postService.findAll(userId);
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    type: Number,
    description: "Post ID",
  })
  @ApiOperation({
    summary: "Find one post by ID",
  })
  findOne(
    @UserId() userId: number,
    @Param("id", ParseIntPipe) id: number,
  ): Promise<PostEntity | null> {
    return this.postService.findOne(id, userId);
  }

  @Patch(":id")
  @ApiParam({
    name: "id",
    description: "Post ID",
    type: Number,
  })
  @ApiBody({
    type: UpdatePostDto,
  })
  @ApiOperation({
    summary: "Update post by post ID",
  })
  update(
    @UserId() userId: number,
    @Param("id", ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postService.update(id, userId, updatePostDto);
  }

  @Delete(":id")
  @ApiParam({
    name: "id",
    description: "Post ID",
    type: Number,
  })
  @ApiOperation({
    summary: "Remove post by ID",
  })
  remove(
    @UserId() userId: number,
    @Param("id", ParseIntPipe) id: number,
  ): Promise<PostEntity> {
    return this.postService.remove(id, userId);
  }
}
