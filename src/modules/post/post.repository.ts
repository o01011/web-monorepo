import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../core/prisma/prisma.service.js";
import { CreatePostDto } from "./dtos/create-post.dto.js";
import { UpdatePostDto } from "./dtos/update-post.dto.js";
import { PostRdo } from "./rdos/post.rdo.js";

@Injectable()
export class PostRepository {
	constructor(@Inject(PrismaService) private readonly prismaService: PrismaService) {}

	public async create(createPostDto: CreatePostDto, authorId: number): Promise<PostRdo> {
		const post = await this.prismaService.post.create({
			data: {
				authorId,
				...createPostDto,
			},
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
		const post = await this.prismaService.post.findFirst({
			where: { authorId, id },
		});

		return post;
	}

	public async update(id: number, authorId: number, updatePostDto: UpdatePostDto): Promise<PostRdo> {
		const post = await this.prismaService.post.update({
			data: updatePostDto,
			where: { authorId, id },
		});

		return post;
	}

	public async remove(id: number, authorId: number): Promise<PostRdo> {
		const post = await this.prismaService.post.delete({
			where: { authorId, id },
		});

		return post;
	}
}
