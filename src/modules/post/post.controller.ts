// TODO:
// 34. Swagger Incomplete
// No @ApiResponse decorators for error codes (400, 401, 404, 409, 500)
// No DTO examples
// Auth endpoints appear as requiring Bearer token in Swagger even though they are public

// TODO:
// 33. No ClassSerializerInterceptor
// @Exclude() on UserRdo.password only works if ClassSerializerInterceptor is active globally. It is not registered in main.ts.
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
import { PostService } from "./post.service.js";
import { CreatePostDto } from "./dtos/create-post.dto.js";
import { UpdatePostDto } from "./dtos/update-post.dto.js";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { JwtGuard } from "../../common/guards/jwt.guard.js";
import { UserId } from "../../common/decorators/user-id.decorator.js";
import { PostRdo } from "./rdos/post.rdo.js";

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
  create(
    @UserId() userId: number,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostRdo> {
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
  ): Promise<PostRdo | null> {
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
  ): Promise<PostRdo> {
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
  ): Promise<PostRdo> {
    return this.postService.remove(id, userId);
  }
}
