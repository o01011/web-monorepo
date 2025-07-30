import { PrismaService } from '@core/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto, PostDto, UpdatePostDto } from '@modules/posts/dto';
import { IPostRepository } from '@modules/posts/interfaces/posts-repository.interface';

@Injectable()
export class PostsRepository implements IPostRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async create(userId: string, createPostDto: CreatePostDto): Promise<PostDto> {
		const post = await this.prismaService.post.create({
			data: {
				description: createPostDto.description,
				userId: userId,
			},
		});

		return new PostDto(post);
	}

	async findAllByUser(userId: string): Promise<PostDto[]> {
		const posts = await this.prismaService.post.findMany({ where: { userId } });

		return posts.map(post => new PostDto(post));
	}

	async findOne(postId: string): Promise<PostDto | null> {
		const post = await this.prismaService.post.findUnique({
			where: { id: postId },
		});

		if (!post) throw new NotFoundException(`Post with id ${postId} not found`);

		return new PostDto(post);
	}

	async update(postId: string, updatePostDto: UpdatePostDto): Promise<PostDto> {
		const post = await this.prismaService.post.update({
			where: { id: postId },
			data: updatePostDto,
		});

		return new PostDto(post);
	}

	async remove(postId: string): Promise<PostDto> {
		const post = await this.prismaService.post.delete({ where: { id: postId } });

		return new PostDto(post);
	}
}
