import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePostCommectDto {
  @Field(() => String)
  comment: string;
}
