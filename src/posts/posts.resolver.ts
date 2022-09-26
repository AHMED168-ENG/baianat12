import { UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/guards/authonticationGuard';
import { UserData } from 'src/common/customDecorator';
import { PostModel } from './models/post.model';
import { UpdatePostDto } from './dto/updatePost.dto';

@UseGuards(AuthGuard)
@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => PostModel)
  async CreatePost(
    @UserData('id') userId: string,
    @Args('createPostDto') createPostDto: CreatePostDto,
  ): Promise<PostModel> {
    return await this.postsService.create(userId, createPostDto);
  }

  @Mutation(() => PostModel)
  async updatePost(
    @UserData('id') userId: string,
    @Args('updatePostDto') updatePostDto: UpdatePostDto,
  ): Promise<PostModel> {
    return await this.postsService.update(userId, updatePostDto);
  }

  @Query(() => [PostModel], { name: 'findAllPosts' })
  async findAllPosts(@Args('userId') userId?: string): Promise<PostModel[]> {
    return await this.postsService.findAll(userId);
  }

  @Query(() => PostModel, { name: 'findOnePost' })
  async findOne(@Args('id') id: string): Promise<PostModel> {
    return await this.postsService.findOne(id);
  }

  @Mutation(() => Number, { name: 'removePost' })
  async remove(@Args('id') id: string, @UserData() userData): Promise<number> {
    return await this.postsService.remove(id, userData);
  }
}
