import { Field, InputType } from '@nestjs/graphql';
import { IsAlphanumeric, IsNotEmpty } from 'class-validator';

@InputType()
export class ResetPassword {
  @Field()
  @IsNotEmpty()
  @IsAlphanumeric()
  oldPassword: string;

  @Field()
  @IsNotEmpty()
  @IsAlphanumeric()
  newPassword: string;

  @Field()
  @IsNotEmpty()
  @IsAlphanumeric()
  confirmPassword: string;
}
