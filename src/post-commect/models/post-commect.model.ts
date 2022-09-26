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
import { PostModel } from 'src/posts/models/post.model';

@Table
@ObjectType()
export class PostCommectModel extends Model {
  @Field(() => String)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id: String;

  @Field(() => String)
  @Column
  postId: string;

  @Field(() => String)
  @Column
  userId: string;

  @Field(() => String)
  @Column({ type: DataType.TEXT })
  comment: string;

  @Field()
  @BelongsTo(() => PostModel, {
    foreignKey: 'postId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
  })
  commentPost: PostModel;
}
