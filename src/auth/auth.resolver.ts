import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/model/user.model';
import { authService } from './auth.service';
import { ResetPassword } from './dto/ResetPassword.dto';
import { signInUser } from './dto/signIn.dto';
import { SignUpUser } from './dto/signUp.dto';

@Resolver()
export class authResolver {
  constructor(private readonly authService: authService) {}

  @Mutation(() => String)
  async signIn(@Args('signInUser') signInUser: signInUser) {
    return this.authService.signIn(signInUser);
  }

  @Mutation(() => User)
  async signUp(@Args('signUpUser') signUpUser: SignUpUser): Promise<User> {
    return await this.authService.signUp(signUpUser);
  }

  @Mutation(() => String)
  async resetPassword(
    @Args('id') id: string,
    @Args('resetPassword') resetPassword: ResetPassword,
  ) {
    return await this.authService.resetPassword(id, resetPassword);
  }
}
