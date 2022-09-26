import { Field, ObjectType } from '@nestjs/graphql';
import {
  Table,
  Model,
  PrimaryKey,
  Default,
  DataType,
  Column,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { PostCommectModel } from 'src/post-commect/models/post-commect.model';
import { PostReactionModel } from 'src/post-reaction/models/post-reaction.model';
import { User } from 'src/user/model/user.model';

@Table
@ObjectType()
export class PostModel extends Model {
  @Field(() => String, { name: 'id' })
  @PrimaryKey
  @Default(DataType.UUIDV1)
  @Column
  id: string;

  @Field(() => String)
  @Column({ type: DataType.STRING })
  post: string;

  @Field(() => String, { nullable: true })
  @Column({ type: DataType.STRING })
  image: string;

  @Field(() => String)
  @Column({ type: DataType.STRING })
  userId: string;

  @Field(() => User)
  @BelongsTo(() => User, 'userId')
  postUser: User;

  @Field(() => [PostCommectModel])
  @HasMany(() => PostCommectModel, 'postId')
  postComments: PostCommectModel[];

  @Field(() => [PostReactionModel])
  @HasMany(() => PostReactionModel, 'postId' )
  PostReaction: [PostReactionModel];
}
