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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { PostEntity } from "./entities/post.entity.ts";

@Controller("post")
@ApiTags("Posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiCreatedResponse({ type: PostEntity })
  create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postService.create(createPostDto);
  }

  @Get(":authorId")
  @ApiOkResponse({ type: PostEntity, isArray: true })
  findAll(
    @Param("authorId", ParseIntPipe) authodId: number,
  ): Promise<PostEntity[]> {
    return this.postService.findAll(authodId);
  }

  @Get(":authorId/:id")
  @ApiOkResponse({ type: PostEntity })
  findOne(
    @Param("authorId", ParseIntPipe) authorId: number,
    @Param("id", ParseIntPipe) id: number,
  ): Promise<PostEntity | null> {
    return this.postService.findOne(id, authorId);
  }

  @Patch(":authorId/:id")
  @ApiOkResponse({
    type: PostEntity,
  })
  update(
    @Param("iauthorId", ParseIntPipe) authorId: number,
    @Param("id", ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postService.update(id, authorId, updatePostDto);
  }

  @Delete(":authorId/:id")
  @ApiOkResponse({ type: PostEntity })
  remove(
    @Param("authorId", ParseIntPipe) authorId: number,
    @Param("id", ParseIntPipe) id: number,
  ): Promise<PostEntity> {
    return this.postService.remove(id, authorId);
  }
}
