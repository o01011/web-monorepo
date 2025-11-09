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
		await this.usersService.findById(userId);

		return this.postsRepository.create(userId, createPostDto);
	}

	async findAllByUserId(userId: string): Promise<PostDto[]> {
		await this.usersService.findById(userId);

		return this.postsRepository.findAllByUserId(userId);
	}

	async findById(userId: string, postId: string): Promise<PostDto> {
		await this.usersService.findById(userId);

		return this.postsRepository.findById(postId);
	}

	async update(userId: string, postId: string, updatePostDto: UpdatePostDto): Promise<PostDto> {
		await this.usersService.findById(userId);

		return this.postsRepository.update(postId, updatePostDto);
	}

	async remove(userId: string, postId: string): Promise<PostDto> {
		await this.usersService.findById(userId);

		return this.postsRepository.remove(postId);
	}
}
