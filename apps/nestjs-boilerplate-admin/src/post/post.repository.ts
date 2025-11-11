import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@libs/core/prisma/prisma.service';
import { IPostRepository } from './interfaces/post-repository.interface';
import { UpdatePostDto, CreatePostDto, PostDto } from './dto';

@Injectable()
export class PostRepository implements IPostRepository {
	private readonly logger = new Logger(PostRepository.name);

	constructor(private readonly prismaService: PrismaService) {}

	async create(userId: string, createPostDto: CreatePostDto): Promise<PostDto> {
		try {
			const post = await this.prismaService.post.create({
				data: {
					description: createPostDto.description,
					userId: userId,
				},
			});

			return new PostDto(post);
		} catch (e) {
			this.logger.error(`Failed to create post for user ${userId}: ${e}`);
		}
	}

	async findAllByUserId(userId: string): Promise<PostDto[]> {
		const posts = await this.prismaService.post.findMany({ where: { userId } });

		return posts.map(post => new PostDto(post));
	}

	async findById(postId: string): Promise<PostDto> {
		const post = await this.prismaService.post.findUnique({
			where: { id: postId },
		});

		return new PostDto(post);
	}

	async update(postId: string, updatePostDto: UpdatePostDto): Promise<PostDto> {
		try {
			const post = await this.prismaService.post.update({
				where: { id: postId },
				data: updatePostDto,
			});

			return new PostDto(post);
		} catch (e) {
			this.logger.error(`Failed to update post ${postId}: ${e}`);
			throw e;
		}
	}

	async remove(postId: string): Promise<PostDto> {
		try {
			const post = await this.prismaService.post.delete({ where: { id: postId } });

			return new PostDto(post);
		} catch (e) {
			this.logger.error(`Failed to delete post ${postId}: ${e}`);
			throw e;
		}
	}
}
