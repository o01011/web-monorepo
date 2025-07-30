import { Injectable } from '@nestjs/common';
import { PostsRepository } from '@modules/posts/posts.repository';
import { UsersService } from '@modules/users/users.service';
import { CreatePostDto, PostDto, UpdatePostDto } from '@modules/posts/dto';

@Injectable()
export class PostsService {
	constructor(
		private readonly postsRepository: PostsRepository,
		private readonly usersService: UsersService,
	) {}

	async create(userId: string, createPostDto: CreatePostDto): Promise<PostDto> {
		await this.usersService.findOne(userId);

		return this.postsRepository.create(userId, createPostDto);
	}

	async findOne(postId: string): Promise<PostDto> {
		const post = await this.postsRepository.findOne(postId);

		return post;
	}

	async update(postId: string, updatePostDto: UpdatePostDto): Promise<PostDto> {
		const post = await this.postsRepository.findOne(postId);

		return this.postsRepository.update(post.id, updatePostDto);
	}

	async remove(postId: string): Promise<PostDto> {
		const post = await this.postsRepository.findOne(postId);

		return this.postsRepository.remove(post.id);
	}
}
