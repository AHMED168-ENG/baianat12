import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsString,
  Length,
  IsEmail,
  IsAlphanumeric,
  IsOptional,
  Max,
  Min,
  IsBoolean,
} from 'class-validator';
import { type } from 'os';
import { Roles } from 'src/common/Roles';
import { DateScalar } from 'src/scalars/scalars';

@InputType()
export class CreateUserDto {
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
  age: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;

  @Field(() => Roles)
  @IsString()
  addres: Roles;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  image: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
