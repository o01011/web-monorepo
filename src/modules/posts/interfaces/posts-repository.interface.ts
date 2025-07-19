import { CreatePostDto, PostDto, UpdatePostDto } from '@modules/posts/dto';

export interface IPostRepository {
	create(createPostDto: CreatePostDto): Promise<PostDto>;
	findOne(id: number): Promise<PostDto | null>;
	update(id: number, updatePostDto: UpdatePostDto): Promise<PostDto>;
	remove(id: number): Promise<PostDto>;
}
