import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { CreatePostDto } from "./dtos/create-post.dto.ts";
import { UpdatePostDto } from "./dtos/update-post.dto.ts";
import { PostEntity } from "./entities/post.entity.ts";
import { PostRepository } from "./post.repository.ts";

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(private readonly postRepository: PostRepository) {}

  create(createPostDto: CreatePostDto): Promise<PostEntity> {
    try {
      return this.postRepository.create(createPostDto);
    } catch (e) {
      this.logger.error(`Error during create post: ${e}`);
      throw new InternalServerErrorException();
    }
  }

  findAll(authorId: number): Promise<PostEntity[]> {
    try {
      return this.postRepository.findAll(authorId);
    } catch (e) {
      this.logger.error(`Error during find all posts: ${e}`);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number, authorId: number): Promise<PostEntity | null> {
    try {
      const post = await this.postRepository.findOne(id, authorId);

      if (!post)
        throw new NotFoundException(
          `Post with id ${id} not found for user with id ${authorId}`,
        );

      return post;
    } catch (e) {
      this.logger.error(`Error during find one post: ${e}`);
      throw new InternalServerErrorException();
    }
  }

  update(id: number, authorId: number, updatePostDto: UpdatePostDto) {
    try {
      return this.postRepository.update(id, authorId, updatePostDto);
    } catch (e) {
      this.logger.error(`Error during update post: ${e}`);
      throw new InternalServerErrorException();
    }
  }

  remove(id: number, authorId: number) {
    try {
      return this.postRepository.remove(id, authorId);
    } catch (e) {
      this.logger.error(`Error during remove post: ${e}`);
      throw new InternalServerErrorException();
    }
  }
}
