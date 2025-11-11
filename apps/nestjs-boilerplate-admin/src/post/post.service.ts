import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { UserService } from '../users/user.service';
import { CreatePostDto, PostDto, UpdatePostDto } from './dto';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class PostService {
	private readonly logger = new Logger(PostService.name);

	constructor(
		private readonly postRepository: PostRepository,
		private readonly userService: UserService,
		private readonly i18nService: I18nService,
	) {}

	async create(userId: string, createPostDto: CreatePostDto): Promise<PostDto> {
		try {
			await this.userService.findById(userId);

			return this.postRepository.create(userId, createPostDto);
		} catch (e) {
			this.logger.error(`Failed to create post for user ${userId}: ${e}`);
			throw e;
		}
	}

	async findAllByUserId(userId: string): Promise<PostDto[]> {
		await this.userService.findById(userId);

		return this.postRepository.findAllByUserId(userId);
	}

	async findById(userId: string, postId: string): Promise<PostDto> {
		await this.userService.findById(userId);

		const post = await this.postRepository.findById(postId);

		if (!post)
			throw new NotFoundException(
				this.i18nService.t('posts.NOT_FOUND', {
					lang: I18nContext.current().lang,
					args: { id: postId },
				}),
			);

		return post;
	}

	async update(userId: string, postId: string, updatePostDto: UpdatePostDto): Promise<PostDto> {
		try {
			const user = await this.userService.findById(userId);

			if (!user)
				throw new NotFoundException(
					this.i18nService.t('users.USER_NOT_FOUND', {
						lang: I18nContext.current().lang,
						args: { id: userId },
					}),
				);

			const post = await this.postRepository.findById(postId);

			if (!post)
				throw new NotFoundException(
					this.i18nService.t('posts.POST_NOT_FOUND', {
						lang: I18nContext.current().lang,
						args: { id: postId },
					}),
				);

			const updatedPost = await this.postRepository.update(postId, updatePostDto);

			return updatedPost;
		} catch (e) {
			this.logger.error(`Faild to update post ${postId}: ${e}`);
			throw e;
		}
	}

	async remove(userId: string, postId: string): Promise<PostDto> {
		try {
			const user = await this.userService.findById(userId);

			if (!user)
				throw new NotFoundException(
					this.i18nService.t('users.USER_NOT_FOUND', {
						lang: I18nContext.current().lang,
						args: { id: userId },
					}),
				);

			const post = await this.postRepository.findById(postId);

			if (!post)
				throw new NotFoundException(
					this.i18nService.t('posts.POST_NOT_FOUND', {
						lang: I18nContext.current().lang,
						args: { id: postId },
					}),
				);

			const deletedPost = await this.postRepository.remove(postId);

			return deletedPost;
		} catch (e) {
			this.logger.error(`Faild to delete post ${postId}: ${e}`);
			throw e;
		}
	}
}
