import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDto } from "./dtos/create-post.dto.ts";
import { UpdatePostDto } from "./dtos/update-post.dto.ts";
import { PostRepository } from "./post.repository.ts";
import { PostRdo } from "./rdos/post.rdo.ts";

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async create(createPostDto: CreatePostDto): Promise<PostRdo> {
    return await this.postRepository.create(createPostDto);
  }

  public async findAll(authorId: number): Promise<PostRdo[]> {
    // TODO: add pagination
    return await this.postRepository.findAll(authorId);
  }

  public async findOne(id: number, authorId: number): Promise<PostRdo | null> {
    const post = await this.postRepository.findOne(id, authorId);

    if (!post)
      throw new NotFoundException(
        `Post with id ${id} not found for user with id ${authorId}`,
      );

    return post;
  }

  public async update(
    id: number,
    authorId: number,
    updatePostDto: UpdatePostDto,
  ) {
    return await this.postRepository.update(id, authorId, updatePostDto);
  }

  public async remove(id: number, authorId: number) {
    return await this.postRepository.remove(id, authorId);
  }
}
