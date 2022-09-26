import { Module } from '@nestjs/common';
import { UserRequestService } from './user-request.service';
import { UserRequestResolver } from './user-request.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRequest } from './models/user-request.model';
import { UserFrindsService } from 'src/user-frinds/user-frinds.service';
import { UserFrindsModule } from 'src/user-frinds/user-frinds.module';
import { UserFollowers } from 'src/user-frinds/models/user-frind.model';

@Module({
  imports: [SequelizeModule.forFeature([UserRequest, UserFollowers])],
  providers: [UserRequestResolver, UserRequestService, UserFrindsService],
})
export class UserRequestModule {}
