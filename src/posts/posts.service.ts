import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { PostCommectModel } from 'src/post-commect/models/post-commect.model';
import { PostReactionModel } from 'src/post-reaction/models/post-reaction.model';
import { User } from 'src/user/model/user.model';
import { CreatePostDto } from './dto/create-post.dto';
import { PostModel } from './models/post.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel(PostModel) private postModel: typeof PostModel) {}
  async create(userId: string, createPostDto) {
    try {
      createPostDto.userId = userId;
      return await this.postModel.create(createPostDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(userId: string) {
    try {
      return await this.postModel.findAll({
        where: {
          userId: userId,
        },
        include: [
          {
            model: User,
            as: 'postUser',
            attributes: {
              exclude: ['password'],
            },
          },
          {
            model: PostCommectModel,
            as: 'postComments',
          },
          {
            model: PostReactionModel,
            as: 'PostReaction',
          },
        ],
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string, userId = null) {
    try {
      return await this.postModel.findOne({
        where: {
          id: id,
          userId: userId ? userId : { [Op.ne]: null },
        },
        include: [
          {
            model: User,
            as: 'postUser',
            attributes: {
              exclude: ['password'],
            },
          },
        ],
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(userId: string, updatePostDto) {
    try {
      let post = await this.findOne(updatePostDto.postId, userId);
      if (!post) {
        throw new HttpException(
          'this post not belongto you',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.postModel.update(updatePostDto, {
        where: {
          id: updatePostDto.postId,
        },
      });
      return this.findOne(updatePostDto.postId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string, userData) {
    try {
      let post = await this.postModel.findOne({
        where: {
          id: id,
          userId: userData.roles == 'Admin' ? { [Op.ne]: null } : userData.id,
        },
      });
      if (!post)
        throw new HttpException('this post not egisted', HttpStatus.NOT_FOUND);
      return await this.postModel.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
