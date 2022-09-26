import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserMessage } from 'src/user-message/model/user-message.model';
import { User } from 'src/user/model/user.model';

@Table
@ObjectType()
export class ConversationModel extends Model {
  @Field()
  @PrimaryKey
  @Default(DataType.UUIDV1)
  @Column
  id: string;

  @Field()
  @Column
  from: string;

  @Field()
  @Column
  to: string;

  @Field(() => User)
  @BelongsTo(() => User, {
    foreignKey: 'from',
    onDelete: 'cascade',
  })
  conversation_user_from: User;

  @Field(() => User)
  @BelongsTo(() => User, {
    foreignKey: 'to',
    onDelete: 'cascade',
  })
  conversation_user_to: User;
}
