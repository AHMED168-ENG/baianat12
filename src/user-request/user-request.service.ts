import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Args, Subscription } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/sequelize';
import { UserFrindsService } from 'src/user-frinds/user-frinds.service';
import { User } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';
import { UserRequest } from './models/user-request.model';

@Injectable()
export class UserRequestService {
  constructor(
    @InjectModel(UserRequest) private userRequest: typeof UserRequest,
    private readonly userFrindsService: UserFrindsService,
  ) {}
  /*--------------- start addRequest function ----------------------------------------*/
  async addRequest(to, userId) {
    try {
      let useequest = await this.findRequest(userId, to);
      if (userId == to)
        throw new HttpException(
          'you cant send request to your self',
          HttpStatus.BAD_REQUEST,
        );
      if (useequest)
        throw new HttpException(
          'you add this request before',
          HttpStatus.BAD_REQUEST,
        );
      return await this.userRequest.create({
        to: to,
        from: userId,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  /*--------------- end addRequest function ----------------------------------------*/

  /*--------------- start removeRequest function ----------------------------------------*/
  async removeRequest(frindId, userId) {
    try {
      let request = await this.findRequest(frindId, userId);
      if (!request) {
        throw new NotFoundException(
          'this frind not send eny requests to you 1',
        );
      }
      return await this.userRequest.destroy({
        where: {
          to: userId,
          from: frindId,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  /*--------------- end removeRequest function ----------------------------------------*/

  /*--------------- start findrequest function ----------------------------------------*/
  async findRequest(frindId: string, userId) {
    try {
      return await this.userRequest.findOne({
        where: {
          to: userId,
          from: frindId,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  /*--------------- end findrequest function ----------------------------------------*/

  /*--------------- start findAllRequest function ----------------------------------------*/
  async findAllRequest(userId) {
    try {
      return await this.userRequest.findAll({
        where: {
          to: userId,
        },
        include: [
          {
            model: User,
            as: 'requestUser',
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
  /*--------------- end findAllRequest function ----------------------------------------*/

  /*--------------- start acceptRequest function ----------------------------------------*/
  async acceptRequest(frindId: string, userId: string) {
    try {
      await this.removeRequest(frindId, userId);
      let frind = await this.userFrindsService.findOne(frindId, userId);
      if (frind) {
        throw new NotFoundException('this frind not send eny requests to you');
      }
      return await this.userFrindsService.create(userId, frindId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  /*--------------- end acceptRequest function ----------------------------------------*/

  /*--------------- start unFollow function ----------------------------------------*/
  async unFollow(frindId: string, userId: string) {
    try {
      return await this.userFrindsService.remove(userId, frindId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  /*--------------- end unFollow function ----------------------------------------*/
}
