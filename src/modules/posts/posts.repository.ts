import { PrismaService } from '@core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePostDto, PostDto, UpdatePostDto } from '@modules/posts/dto';
import { IPostRepository } from '@modules/posts/interfaces/posts-repository.interface';

@Injectable()
export class PostsRepository implements IPostRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async create(createPostDto: CreatePostDto): Promise<PostDto> {
		const post = await this.prismaService.post.create({ data: createPostDto });
		return new PostDto(post);
	}

	async findOne(id: number): Promise<PostDto | null> {
		const post = await this.prismaService.post.findUnique({
			where: { id },
		});

		return new PostDto(post);
	}

	async update(id: number, updatePostDto: UpdatePostDto): Promise<PostDto> {
		const post = await this.prismaService.post.update({
			where: { id },
			data: updatePostDto,
		});

		return new PostDto(post);
	}

	async remove(id: number): Promise<PostDto> {
		const post = await this.prismaService.post.delete({ where: { id } });

		return new PostDto(post);
	}
}
