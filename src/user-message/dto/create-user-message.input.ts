import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserMessageInput {
  @Field()
  message: string;

  @Field()
  to: string;
}
