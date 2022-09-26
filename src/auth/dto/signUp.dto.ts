import { Field, InputType } from '@nestjs/graphql';
import {
  IsAlphanumeric,
  IsEmail,
  IsString,
  IsBoolean,
  Max,
  Min,
  IsOptional,
} from 'class-validator';

@InputType()
export class SignUpUser {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsAlphanumeric()
  password: string;

  @Field()
  @Max(100)
  @Min(20)
  age: number;

  @Field()
  @IsString()
  addres: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  image: string;
}
