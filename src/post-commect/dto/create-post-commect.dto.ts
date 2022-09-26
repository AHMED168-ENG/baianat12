import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostCommectDto {
  @Field(() => String)
  comment: string;

  @Field(() => String)
  postId: string;
}
