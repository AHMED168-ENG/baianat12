import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class MyMessagesWithUser {

  @Field()
  to: string;

  @Field()
  order: string;
}
