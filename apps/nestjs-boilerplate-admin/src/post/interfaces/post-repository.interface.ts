import { UpdatePostDto, CreatePostDto, PostDto } from '../dto';

export interface IPostRepository {
	create(userId: string, createPostDto: CreatePostDto): Promise<PostDto>;
	findById(postId: string): Promise<PostDto>;
	update(postId: string, updatePostDto: UpdatePostDto): Promise<PostDto>;
	remove(postId: string): Promise<PostDto>;
}
