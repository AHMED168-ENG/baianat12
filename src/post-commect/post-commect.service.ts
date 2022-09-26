import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { PostCommectModel } from './models/post-commect.model';

@Injectable()
export class PostCommectService {
  constructor(
    @InjectModel(PostCommectModel)
    private postCommectModel: typeof PostCommectModel,
  ) {}

  async create(userId, createPostCommectDto) {
    try {
      createPostCommectDto.userId = userId;
      return await this.postCommectModel.create(createPostCommectDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(postId: string) {
    try {
      return await this.postCommectModel.findAll({
        where: {
          postId: postId,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string, userId: string = null) {
    try {
      return await this.postCommectModel.findOne({
        where: {
          id,
          userId: userId ? userId : { [Op.ne]: null },
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updatePostCommectDto, userId) {
    try {
      let comment = await this.findOne(id, userId);
      if (!comment) {
        throw new HttpException(
          'this comment not belong to you',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.postCommectModel.update(updatePostCommectDto, {
        where: {
          id,
        },
      });
      return this.findOne(id, userId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id, userId) {
    try {
      let comment = await this.findOne(id, userId);
      if (!comment) {
        throw new HttpException(
          'this comment not belong to you',
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.postCommectModel.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
