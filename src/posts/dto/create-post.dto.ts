import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreatePostDto {
  @Field(() => String)
  post: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  image: string;
}
