import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateConversationInput {
  @Field()
  from: string;

  @Field()
  to: string;
}
