import { Field, ObjectType } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/model/user.model';

@ObjectType()
@Table
export class UserRequest extends Model {
  @Field()
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.STRING })
  id: string;

  @Field()
  @Column({ type: DataType.STRING })
  to: string;

  @Field(() => String)
  @Column({ type: DataType.STRING })
  from: string;

  @Field(() => User)
  @BelongsTo(() => User, {
    foreignKey: 'from',
    onDelete: 'casscade',
    onUpdate: 'casscade',
  })
  requestUser: User;
}
