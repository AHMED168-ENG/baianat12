import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class authService {
  constructor(
    private readonly userservice: UserService,
    private readonly mailservice: MailService,
  ) {}

  async signIn(signInUser) {
    try {
      // find User by email ////////////
      let user = await this.userservice.findOneByEmail(signInUser.email);
      // check if email hir in database ////////////
      if (user) {
        // validation password ///////
        let validePassword = bcrypt.compareSync(
          signInUser.password,
          user.password,
        );
        if (validePassword) {
          /// get the tocken
          let tocken = jwt.sign(
            {
              id: user.id,
              roles: user.roles,
            },
            process.env.SECRET_NAME,
            { expiresIn: process.env.EXPIRED },
          );
          return tocken;
        } else {
          // throw error if password wrong
          throw new BadRequestException({
            message: 'password is not valid',
          });
        }
      } else {
        // throw error if email not exist in database
        throw new BadRequestException({
          message: 'this email not exist',
        });
      }
    } catch (error) {
      console.log(error);
      // if eny error done in tha code
      throw new BadRequestException({
        message: error,
      });
    }
  }

  async signUp(signUpUser) {
    try {
      var text = `hi ${signUpUser.name} welcome hir in baianat comunity we send this email to mack you active your account and for security else`;
      await this.mailservice.main({
        email: signUpUser.email,
        supject: 'Confirmation Message',
        text: text,
        htmlMessage: `<h2>${signUpUser.email}</h2><p>${text}</p><a style="padding:4px 10px;color:#fff;background:#555" href="activeAcount">Active Account</a>`,
      });
      return await this.userservice.create(signUpUser);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async resetPassword(id, resetPassword) {
    try {
      let user = await this.userservice.findOne(id);
      let validPassword = bcrypt.compareSync(
        resetPassword.oldPassword,
        user.password,
      );
      console.log(validPassword);
      if (!validPassword)
        throw new HttpException(
          'sorry your password not correct',
          HttpStatus.BAD_REQUEST,
        );
      if (resetPassword.confirmPassword !== resetPassword.newPassword)
        throw new HttpException(
          'Please, the old password and the new password must match',
          HttpStatus.BAD_REQUEST,
        );
      let password = bcrypt.hashSync(
        resetPassword.newPassword,
        +process.env.SALTROUNDS,
      );
      await this.userservice.updatePassword(id, password);
      return true;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
