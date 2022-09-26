import { ObjectType, Field, Int } from '@nestjs/graphql';
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
import { User } from 'src/user/model/user.model';

@ObjectType()
@Table
export class UserMessage extends Model {
  @Field()
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @Field()
  @Column({ type: DataType.STRING })
  message: string;

  @Field()
  @Column
  from: string;

  @Field()
  @Column
  to: string;

  // @Field(() => User)
  // @BelongsTo(() => User, 'from')
  // fromMessage: User;

  // @Field(() => User)
  // @BelongsTo(() => User, 'to')
  // toMessage: User;
}
