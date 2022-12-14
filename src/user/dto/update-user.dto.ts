import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  IsBoolean,
} from 'class-validator';

@InputType()
export class UpdateUserInput {
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
  @Max(40)
  @Min(15)
  age: number;

  @Field({ nullable: true })
  @IsOptional()
  @Length(10, 250)
  addres: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
