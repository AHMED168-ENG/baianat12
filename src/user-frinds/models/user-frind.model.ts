import { ObjectType, Field, Int } from '@nestjs/graphql';
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

@Table
@ObjectType()
export class UserFollowers extends Model {
  @Field()
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.STRING })
  id: string;

  @Field()
  @Column({ type: DataType.STRING })
  userId: string;

  @Field(() => String)
  @Column({ type: DataType.STRING })
  follower: string;

  @Field(() => User)
  @BelongsTo(() => User, {
    foreignKey: 'follower',
    onDelete: 'casscade',
    onUpdate: 'casscade',
  })
  followerData: User;
}
