import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto, PostDto, UpdatePostDto } from '@modules/posts/dto';
import { IPostRepository } from '@modules/posts/interfaces/posts-repository.interface';
import { PrismaService } from '@core/prisma/prisma.service';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class PostsRepository implements IPostRepository {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly i18nService: I18nService,
	) {}

	async create(userId: string, createPostDto: CreatePostDto): Promise<PostDto> {
		const post = await this.prismaService.post.create({
			data: {
				description: createPostDto.description,
				userId: userId,
			},
		});

		return new PostDto(post);
	}

	async findAllByUserId(userId: string): Promise<PostDto[]> {
		const posts = await this.prismaService.post.findMany({ where: { userId } });

		return posts.map(post => new PostDto(post));
	}

	async findById(postId: string): Promise<PostDto> {
		const post = await this.prismaService.post.findUnique({
			where: { id: postId },
		});

		if (!post)
			throw new NotFoundException(
				this.i18nService.t('posts.POST_NOT_FOUND', {
					lang: I18nContext.current().lang,
				}),
			);

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
