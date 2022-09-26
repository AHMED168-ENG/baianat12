import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostReactionInput } from './dto/create-post-reaction.input';
import { UpdatePostReactionInput } from './dto/update-post-reaction.input';
import { PostReactionModel } from './models/post-reaction.model';

@Injectable()
export class PostReactionService {
  constructor(
    @InjectModel(PostReactionModel)
    private postReactionModel: typeof PostReactionModel,
  ) {}
  async createReactPost(createPostReactionInput, userId: string) {
    try {
      createPostReactionInput.userId = userId;
      return await this.postReactionModel.create(createPostReactionInput);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(UpdatePostReactionInput, userId) {
    try {
      await this.postReactionModel.update(
        {
          type: UpdatePostReactionInput.type,
        },
        {
          where: {
            postId: UpdatePostReactionInput.postId,
            userId: userId,
          },
        },
      );
      return this.findAll(UpdatePostReactionInput.postId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  
  async findAll(postId) {
    try {
      return await this.postReactionModel.findAll({
        where: {
          postId: postId,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(postId, userId) {
    try {
      return await this.postReactionModel.destroy({
        where: {
          postId: postId,
          userId: userId,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
