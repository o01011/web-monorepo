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
import { PostService } from "./post.service.ts";
import { CreatePostDto } from "./dtos/create-post.dto.ts";
import { UpdatePostDto } from "./dtos/update-post.dto.ts";
import { ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { PostEntity } from "./entities/post.entity.ts";

@Controller("posts")
@ApiTags("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiBody({
    type: CreatePostDto,
  })
  @ApiOperation({
    summary: "Create new post with authod ID",
  })
  create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postService.create(createPostDto);
  }

  @Get(":authorId")
  @ApiParam({
    name: "authorId",
    description: "Author ID",
    type: Number,
  })
  @ApiOperation({
    summary: "Find all posts by author ID",
  })
  findAll(
    @Param("authorId", ParseIntPipe) authodId: number,
  ): Promise<PostEntity[]> {
    return this.postService.findAll(authodId);
  }

  @Get(":authorId/:id")
  @ApiParam({
    name: "authorId",
    description: "Author ID",
    type: Number,
  })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Post ID",
  })
  @ApiOperation({
    summary: "Find one post by ID and author ID",
  })
  findOne(
    @Param("authorId", ParseIntPipe) authorId: number,
    @Param("id", ParseIntPipe) id: number,
  ): Promise<PostEntity | null> {
    return this.postService.findOne(id, authorId);
  }

  @Patch(":authorId/:id")
  @ApiParam({
    name: "authorId",
    description: "Author ID",
    type: Number,
  })
  @ApiParam({
    name: "id",
    description: "Post ID",
    type: Number,
  })
  @ApiBody({
    type: UpdatePostDto,
  })
  @ApiOperation({
    summary: "Update post by post ID and author ID",
  })
  update(
    @Param("authorId", ParseIntPipe) authorId: number,
    @Param("id", ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postService.update(id, authorId, updatePostDto);
  }

  @Delete(":authorId/:id")
  @ApiParam({
    name: "authorId",
    description: "Author ID",
    type: Number,
  })
  @ApiParam({
    name: "id",
    description: "Post ID",
    type: Number,
  })
  @ApiOperation({
    summary: "Remove post by ID and authod ID",
  })
  remove(
    @Param("authorId", ParseIntPipe) authorId: number,
    @Param("id", ParseIntPipe) id: number,
  ): Promise<PostEntity> {
    return this.postService.remove(id, authorId);
  }
}
