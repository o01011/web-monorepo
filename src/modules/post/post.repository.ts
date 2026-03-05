import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../core/prisma/prisma.service.ts";
import { CreatePostDto } from "./dtos/create-post.dto.ts";
import { UpdatePostDto } from "./dtos/update-post.dto.ts";
import { PostRdo } from "./rdos/post.rdo.ts";

@Injectable()
export class PostRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(createPostDto: CreatePostDto): Promise<PostRdo> {
    const post = await this.prismaService.post.create({
      data: createPostDto,
    });

    return post;
  }

  public async findAll(authorId: number): Promise<PostRdo[]> {
    const posts = await this.prismaService.post.findMany({
      where: { authorId },
    });

    return posts;
  }

  public async findOne(id: number, authorId: number): Promise<PostRdo | null> {
    const post = await this.prismaService.post.findUnique({
      where: { id, authorId },
    });

    return post;
  }

  public async update(
    id: number,
    authorId: number,
    updatePostDto: UpdatePostDto,
  ): Promise<PostRdo> {
    const post = await this.prismaService.post.update({
      where: { id, authorId },
      data: updatePostDto,
    });

    return post;
  }

  public async remove(id: number, authorId: number): Promise<PostRdo> {
    const post = await this.prismaService.post.delete({
      where: { id, authorId },
    });

    return post;
  }
}
