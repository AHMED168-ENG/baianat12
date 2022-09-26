import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailService } from 'src/mail/mail.service';
import { User } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';
import { authResolver } from './auth.resolver';
import { authService } from './auth.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [authResolver, authService, UserService, MailService],
})
export class AuthModule {}
