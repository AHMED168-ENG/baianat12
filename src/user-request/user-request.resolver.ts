import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { UserRequestService } from './user-request.service';
import { UserRequest } from './models/user-request.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/authonticationGuard';
import { PubSub } from 'graphql-subscriptions';
import { UserData } from 'src/common/customDecorator';
import { UserFollowers } from 'src/user-frinds/models/user-frind.model';

const pobSup = new PubSub();
@Resolver()
export class UserRequestResolver {
  constructor(private readonly userRequestService: UserRequestService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => UserRequest)
  async addRequest(
    @Args('to')
    to: string,
    @UserData('id') userId: string,
  ): Promise<UserRequest> {
    let userReq = await this.userRequestService.addRequest(to, userId);
    pobSup.publish('addRequestSockit', to);
    return userReq;
  }

  @UseGuards(AuthGuard)
  @Query(() => [UserRequest])
  async findAllRequests(
    @UserData('id') userId: string,
  ): Promise<UserRequest[]> {
    // pobSup.publish('frindAdded', frindId);
    return await this.userRequestService.findAllRequest(userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Number)
  async removeRequest(
    @UserData('id') userId: string,
    @Args('frindId') frindId: string,
  ): Promise<number> {
    let deletedRequest = await this.userRequestService.removeRequest(
      frindId,
      userId,
    );
    pobSup.publish('removeRequestSockit', frindId);
    return deletedRequest;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => UserFollowers)
  async acceptRequest(
    @Args('frindId') frindId: string,
    @UserData('id') userId: string,
  ): Promise<UserFollowers> {
    let userFollower = await this.userRequestService.acceptRequest(
      frindId,
      userId,
    );
    pobSup.publish('acceptRequestSockit', frindId);
    return userFollower;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Number)
  async unFollow(
    @Args('frindId') frindId: string,
    @UserData('id') userId: string,
  ): Promise<number> {
    let state = await this.userRequestService.unFollow(frindId, userId);
    pobSup.publish('unFollowSockit', frindId);
    return state;
  }

  ///////////////////////////////////// start part of Subscription ////////////////////////////////////////

  @Subscription((returns) => String, {
    resolve: (value) => value,
    filter: (payload, variabels) => {
      return payload == variabels.frindId;
    },
  })
  addRequestSockit(@Args('frindId') frindId: string) {
    return pobSup.asyncIterator('addRequestSockit');
  }

  @Subscription((returns) => String, {
    resolve: (value) => value,
    filter: (payload, variabels) => payload == variabels.frindId,
  })
  removeRequestSockit(@Args('frindId') frindId: string) {
    return pobSup.asyncIterator('removeRequestSockit');
  }

  @Subscription((returns) => String, {
    resolve: (value) => value,
    filter: (payload, variabels) => payload == variabels.frindId,
  })
  unFollowSockit(@Args('frindId') frindId: string) {
    return pobSup.asyncIterator('unFollowSockit');
  }

  @Subscription((returns) => String, {
    resolve: (value) => value,
    filter: (payload, variabels) => {
      return payload == variabels.frindId;
    },
  })
  acceptRequestSockit(@Args('frindId') frindId: string) {
    return pobSup.asyncIterator('acceptRequestSockit');
  }
  ///////////////////////////////////// start part of Subscription ////////////////////////////////////////
}
