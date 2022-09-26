import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostReactionService } from './post-reaction.service';
import { PostReactionModel } from './models/post-reaction.model';
import { CreatePostReactionInput } from './dto/create-post-reaction.input';
import { UpdatePostReactionInput } from './dto/update-post-reaction.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/authonticationGuard';
import { UserData } from 'src/common/customDecorator';

@UseGuards(AuthGuard)
@Resolver(() => PostReactionModel)
export class PostReactionResolver {
  constructor(private readonly postReactionService: PostReactionService) {}

  @Mutation(() => PostReactionModel, { name: 'createPostReaction' })
  async create(
    @Args('createPostReactionInput')
    createPostReactionInput: CreatePostReactionInput,
    @UserData('id') userId: string,
  ) {
    return await this.postReactionService.createReactPost(
      createPostReactionInput,
      userId,
    );
  }

  @Query(() => [PostReactionModel], { name: 'AllReaction' })
  async findAll(@Args('postId') postId: string) {
    return await this.postReactionService.findAll(postId);
  }

  @Mutation(() => [PostReactionModel], { name: 'updatePostReaction' })
  async update(
    @Args('updatePostReactionInput')
    updatePostReactionInput: UpdatePostReactionInput,
    @UserData('id') userId: string,
  ) {
    return await this.postReactionService.update(
      updatePostReactionInput,
      userId,
    );
  }

  @Mutation(() => Boolean, { name: 'removePostReaction' })
  async remove(@Args('postId') postId: string, @UserData('id') userId: string) {
    return await this.postReactionService.remove(postId, userId);
  }
}
