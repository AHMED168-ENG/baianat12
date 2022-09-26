import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { User } from './model/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { UpdateMyAccountInput } from './dto/updateMyAccount';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private user: typeof User) {}
  async create(createUserDto) {
    try {
      // check  if email is exsist
      let user = await this.findOneByEmail(createUserDto.email);
      if (user) {
        throw new HttpException(
          'this email already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      // bcrypt password /////////
      createUserDto.password = bcrypt.hashSync(
        createUserDto.password,
        +process.env.SALTROUNDS,
      );
      // add roles to user /////////
      createUserDto.roles = createUserDto.isAdmin ? 'Admin' : 'User';

      // create user /////////////
      return await this.user.create(createUserDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.user.findAll({
        attributes: {
          exclude: ['password'],
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string, exclude = []) {
    try {
      return await this.user.findOne({
        where: {
          id: id,
        },
        attributes: { exclude },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneByEmail(email: string, id: string = null) {
    try {
      return await this.user.findOne({
        where: {
          email: email,
          id: id
            ? {
                [Op.ne]: id,
              }
            : { [Op.ne]: '' },
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateUserDto) {
    try {
      let user = await this.findOne(id);
      if (!user)
        throw new HttpException(
          'this id not found in my account',
          HttpStatus.NOT_FOUND,
        );
      if (updateUserDto.email) {
        // check  if email is exsist
        let Email = await this.findOneByEmail(updateUserDto.email, id);
        if (Email) {
          throw new HttpException(
            'this email already exist',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      updateUserDto.roles = updateUserDto.isAdmin ? 'Admin' : 'User';
      await this.user.update(updateUserDto, {
        where: {
          id: id,
        },
      });
      return this.findOne(id, ['password']);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateMyAccountInput(
    id: string,
    updateMyAccountInput: UpdateMyAccountInput,
  ) {
    try {
      let user = await this.findOne(id);
      if (!user)
        throw new HttpException(
          'this id not found in my account',
          HttpStatus.NOT_FOUND,
        );
      if (updateMyAccountInput.email) {
        // check  if email is exsist
        let user = await this.findOneByEmail(updateMyAccountInput.email, id);
        if (user) {
          throw new HttpException(
            'this email already exist',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      await this.user.update(updateMyAccountInput, {
        where: {
          id: id,
        },
      });
      return this.findOne(id, ['password']);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updatePassword(id: string, password: string) {
    try {
      await this.user.update(
        {
          password: password,
        },
        {
          where: {
            id,
          },
        },
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      let user = await this.findOne(id);
      if (!user)
        throw new HttpException(
          'this id not found in my account',
          HttpStatus.NOT_FOUND,
        );
      return await this.user.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
