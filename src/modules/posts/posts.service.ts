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

	async create(createPostDto: CreatePostDto): Promise<PostDto> {
		const { userId } = createPostDto;

		await this.usersService.findOne(userId);

		return this.postsRepository.create(createPostDto);
	}

	async findOne(id: number): Promise<PostDto> {
		const post = await this.postsRepository.findOne(id);

		return post;
	}

	async update(id: number, updatePostDto: UpdatePostDto): Promise<PostDto> {
		const post = await this.postsRepository.findOne(id);

		return this.postsRepository.update(post.id, updatePostDto);
	}

	async remove(id: number): Promise<PostDto> {
		const post = await this.postsRepository.findOne(id);

		return this.postsRepository.remove(post.id);
	}
}
