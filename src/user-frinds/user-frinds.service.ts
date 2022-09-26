import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';
import { UserFollowers } from './models/user-frind.model';

@Injectable()
export class UserFrindsService {
  constructor(
    @InjectModel(UserFollowers) private userFollowers: typeof UserFollowers,
  ) {}
  async create(userId, followerId) {
    return await this.userFollowers.create({
      userId: userId,
      follower: followerId,
    });
  }

  async findAllFollowers(userId: string) {
    console.log(userId);
    return await this.userFollowers.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: User,
          as: 'followerData',
          attributes: {
            exclude: ['password'],
          },
        },
      ],
    });
  }

  async findOne(followerId, userId) {
    return await this.userFollowers.findOne({
      where: {
        userId: userId,
        follower: followerId,
      },
    });
  }

  async remove(userId, followerId) {
    let frind = await this.findOne(followerId, userId);
    if (!frind) throw new NotFoundException('this frind not your follow');

    return await this.userFollowers.destroy({
      where: {
        userId: userId,
        follower: followerId,
      },
    });
  }
}
