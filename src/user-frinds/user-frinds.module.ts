import { Module } from '@nestjs/common';
import { UserFrindsService } from './user-frinds.service';
import { UserFrindsResolver } from './user-frinds.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserFollowers } from './models/user-frind.model';
import { User } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [SequelizeModule.forFeature([UserFollowers])],
  providers: [UserFrindsResolver, UserFrindsService],
})
export class UserFrindsModule {}
