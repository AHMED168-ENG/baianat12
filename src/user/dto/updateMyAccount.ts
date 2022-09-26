import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

@InputType()
export class UpdateMyAccountInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(5, 25)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail({}, { message: 'this filed accept email only' })
  email: string;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  age: number;

  @Field({ nullable: true })
  @IsOptional()
  @Length(10, 250)
  addres: string;

  @Field({ nullable: true })
  image: string;
}
