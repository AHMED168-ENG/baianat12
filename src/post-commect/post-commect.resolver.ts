import { PostCommectService } from './post-commect.service';
import { CreatePostCommectDto } from './dto/create-post-commect.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostCommectModel } from './models/post-commect.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/authonticationGuard';
import { UserData } from 'src/common/customDecorator';
import { UpdatePostCommectDto } from './dto/update-post-comments.dto';
@UseGuards(AuthGuard)
@Resolver()
export class PostCommectResolver {
  constructor(private readonly postCommectService: PostCommectService) {}

  @Mutation(() => PostCommectModel, { name: 'createComment' })
  async create(
    @UserData('id') id: string,
    @Args('createPostCommectDto') createPostCommectDto: CreatePostCommectDto,
  ) {
    return await this.postCommectService.create(id, createPostCommectDto);
  }

  @Query(() => [PostCommectModel], { name: 'findAllComment' })
  findAll(@Args('postId') postId: string) {
    return this.postCommectService.findAll(postId);
  }

  @Query(() => PostCommectModel, { name: 'findOneComment' })
  async findOne(@Args('id') id: string) {
    return await this.postCommectService.findOne(id);
  }

  @Mutation(() => PostCommectModel, { name: 'updateComment' })
  async update(
    @UserData('id') userId: string,
    @Args('id') id: string,
    @Args('updatePostCommectDto') updatePostCommectDto: UpdatePostCommectDto,
  ) {
    return this.postCommectService.update(id, updatePostCommectDto, userId);
  }

  @Mutation(() => Number, { name: 'removeComment' })
  remove(@UserData('id') userId: string, @Args('id') id: string) {
    return this.postCommectService.remove(id, userId);
  }
}
