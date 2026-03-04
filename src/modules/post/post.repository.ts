// TODO: check if needed to try catch here (maybe go to GEF)
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { PrismaService } from "../../core/prisma/prisma.service.ts";
import { CreatePostDto } from "./dtos/create-post.dto.ts";
import { UpdatePostDto } from "./dtos/update-post.dto.ts";
import { PostRdo } from "./rdos/post.rdo.ts";

@Injectable()
export class PostRepository {
  private readonly logger = new Logger(PostRepository.name);

  constructor(private readonly prismaService: PrismaService) {}

  public async create(createPostDto: CreatePostDto): Promise<PostRdo> {
    try {
      const post = await this.prismaService.post.create({
        data: createPostDto,
      });

      return post;
    } catch (e) {
      this.logger.error(`Error during create new post: ${e}`);
      throw new InternalServerErrorException();
    }
  }

  public async findAll(authorId: number): Promise<PostRdo[]> {
    try {
      const posts = await this.prismaService.post.findMany({
        where: { authorId },
      });

      return posts;
    } catch (e) {
      this.logger.error(`Error during find all posts: ${e}`);
      throw new InternalServerErrorException();
    }
  }

  public async findOne(id: number, authorId: number): Promise<PostRdo | null> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: { id, authorId },
      });

      return post;
    } catch (e) {
      this.logger.error(`Error during find one post: ${e}`);
      throw new InternalServerErrorException();
    }
  }

  public async update(
    id: number,
    authorId: number,
    updatePostDto: UpdatePostDto,
  ): Promise<PostRdo> {
    try {
      const post = await this.prismaService.post.update({
        where: { id, authorId },
        data: updatePostDto,
      });

      return post;
    } catch (e) {
      this.logger.error(`Error during update post: ${e}`);
      throw new InternalServerErrorException();
    }
  }

  public async remove(id: number, authorId: number): Promise<PostRdo> {
    try {
      const post = await this.prismaService.post.delete({
        where: { id, authorId },
      });

      return post;
    } catch (e) {
      this.logger.error(`Error during remove post: ${e}`);
      throw new InternalServerErrorException();
    }
  }
}
