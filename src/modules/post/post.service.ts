// TODO:
// 36. No HTTP Caching
// Redis is wired but not used for response caching. No CacheInterceptor or cache-aside pattern in services.
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDto } from "./dtos/create-post.dto.js";
import { UpdatePostDto } from "./dtos/update-post.dto.js";
import { PostRepository } from "./post.repository.js";
import { PostRdo } from "./rdos/post.rdo.js";

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async create(
    createPostDto: CreatePostDto,
    authorId: number,
  ): Promise<PostRdo> {
    return await this.postRepository.create(createPostDto, authorId);
  }

  // TODO:
  // 18. Missing Pagination
  // PostService.findAll returns all posts for a user with no pagination, sorting, or filtering. This will not scale.
  // Fix: Add cursor-based or offset pagination with configurable page size.
  public async findAll(authorId: number): Promise<PostRdo[]> {
    return await this.postRepository.findAll(authorId);
  }

  public async findOne(id: number, authorId: number): Promise<PostRdo | null> {
    const post = await this.postRepository.findOne(id, authorId);

    if (!post) {
      throw new NotFoundException(
        `Post with id ${id} not found for user with id ${authorId}`,
      );
    }

    return post;
  }

  public async update(
    id: number,
    authorId: number,
    updatePostDto: UpdatePostDto,
  ) {
    const post = await this.postRepository.findOne(id, authorId);

    if (!post) {
      throw new NotFoundException(
        `Post with id ${id} not found for user with id ${authorId}`,
      );
    }

    return await this.postRepository.update(id, authorId, updatePostDto);
  }

  public async remove(id: number, authorId: number) {
    const post = await this.postRepository.findOne(id, authorId);

    if (!post) {
      throw new NotFoundException(
        `Post with id ${id} not found for user with id ${authorId}`,
      );
    }

    return await this.postRepository.remove(id, authorId);
  }
}
