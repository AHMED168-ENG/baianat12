import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserFrindsService } from './user-frinds.service';
import { UserFollowers } from './models/user-frind.model';
import { operation_Frindes } from './dto/operation_Frindes.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/authonticationGuard';
import { UserData } from 'src/common/customDecorator';

@UseGuards(AuthGuard)
@Resolver(() => UserFollowers)
export class UserFrindsResolver {
  constructor(private readonly userFrindsService: UserFrindsService) {}

  @Query(() => [UserFollowers])
  findAllfollowers(@UserData('id') userId: string) {
    return this.userFrindsService.findAllFollowers(userId);
  }
}
