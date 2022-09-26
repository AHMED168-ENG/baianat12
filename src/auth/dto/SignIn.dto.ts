import { Field, InputType } from '@nestjs/graphql';
import { IsAlphanumeric, isEmail, IsEmail } from 'class-validator';

@InputType()
export class signInUser {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsAlphanumeric()
  password: string;
}
