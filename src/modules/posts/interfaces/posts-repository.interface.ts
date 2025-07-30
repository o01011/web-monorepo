import { CreatePostDto, PostDto, UpdatePostDto } from '@modules/posts/dto';

export interface IPostRepository {
	create(userId: string, createPostDto: CreatePostDto): Promise<PostDto>;
	findOne(postId: string): Promise<PostDto | null>;
	update(postId: string, updatePostDto: UpdatePostDto): Promise<PostDto>;
	remove(postId: string): Promise<PostDto>;
}
