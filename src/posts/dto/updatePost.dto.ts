import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdatePostDto {
  @Field(() => String)
  post: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  image: string;

  @Field(() => String)
  postId: string;
}
