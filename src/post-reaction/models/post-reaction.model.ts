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
import { PostModel } from 'src/posts/models/post.model';

@ObjectType()
@Table
export class PostReactionModel extends Model {
  @Field()
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.STRING })
  id: string;

  @Field()
  @Column
  postId: string;

  @Field(() => String)
  @Column({ type: DataType.STRING })
  userId: string;

  @Field(() => String)
  @Column({ type: DataType.STRING })
  type: string;

  @Field(() => PostModel)
  @BelongsTo(() => PostModel, {
    foreignKey: 'postId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
  })
  PostReactionPost: PostModel;
}
