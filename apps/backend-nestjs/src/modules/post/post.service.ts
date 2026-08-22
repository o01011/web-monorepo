import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDto } from "./dtos/create-post.dto.js";
import { UpdatePostDto } from "./dtos/update-post.dto.js";
import { PostRepository } from "./post.repository.js";
import { PostRdo } from "./rdos/post.rdo.js";

@Injectable()
export class PostService {
	constructor(@Inject(PostRepository) private readonly postRepository: PostRepository) {}

	public async create(createPostDto: CreatePostDto, authorId: number): Promise<PostRdo> {
		return await this.postRepository.create(createPostDto, authorId);
	}

	public async findAll(authorId: number): Promise<PostRdo[]> {
		return await this.postRepository.findAll(authorId);
	}

	public async findOne(id: number, authorId: number): Promise<PostRdo | null> {
		const post = await this.postRepository.findOne(id, authorId);

		if (!post) {
			throw new NotFoundException(`Post with id ${id} not found for user with id ${authorId}`);
		}

		return post;
	}

	public async update(id: number, authorId: number, updatePostDto: UpdatePostDto): Promise<PostRdo> {
		const post = await this.postRepository.findOne(id, authorId);

		if (!post) {
			throw new NotFoundException(`Post with id ${id} not found for user with id ${authorId}`);
		}

		return await this.postRepository.update(id, authorId, updatePostDto);
	}

	public async remove(id: number, authorId: number): Promise<PostRdo> {
		const post = await this.postRepository.findOne(id, authorId);

		if (!post) {
			throw new NotFoundException(`Post with id ${id} not found for user with id ${authorId}`);
		}

		return await this.postRepository.remove(id, authorId);
	}
}
