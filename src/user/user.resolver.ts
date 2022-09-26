import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { User } from './model/user.model';
import { UpdateMyAccountInput } from './dto/updateMyAccount';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/authonticationGuard';
import { SetRoles } from 'src/common/customFunctionDecorator';
import { Roles } from 'src/common/Roles';
import { RolesGuard } from 'src/guards/authoraization.Guard';
import { UserData } from 'src/common/customDecorator';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { name: 'ceateUser' })
  async create(@Args('createUserDto') createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Query(() => [User], { name: 'findAllUser' })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Query(() => User, { name: 'findOneUser' })
  async findOne(@Args('id') id: string) {
    return await this.userService.findOne(id, ['password']);
  }

  @Mutation(() => User, { name: 'updateUser' })
  async update(
    @Args('id') id: string,
    @Args('updateUserDto') updateUserDto: UpdateUserInput,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  async updateMyAccountInput(
    @UserData('id') id: string,
    @Args('updateMyAccountInput') updateMyAccountInput: UpdateMyAccountInput,
  ) {
    return await this.userService.updateMyAccountInput(
      id,
      updateMyAccountInput,
    );
  }

  @SetRoles(Roles.Admin)
  @Mutation(() => Boolean, { name: 'removeUser' })
  async remove(@Args('id') id: string) {
    return await this.userService.remove(id);
  }
}
