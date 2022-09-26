import {
  Table,
  Model,
  Column,
  PrimaryKey,
  Default,
  DataType,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Roles } from 'src/common/Roles';
import { UserRequest } from 'src/user-request/models/user-request.model';
import { UserMessage } from 'src/user-message/model/user-message.model';

@Table
@ObjectType()
export class User extends Model {
  @Field((type) => String, { name: 'id', description: 'id' })
  @PrimaryKey
  @Default(DataType.UUIDV1)
  @Column
  id: string;

  @Field()
  @Column({ type: DataType.STRING })
  name: string;

  @Field()
  @Column({ type: DataType.STRING })
  email: string;

  @Field()
  @Column({ type: DataType.STRING })
  password: string;

  @Field((type) => Int, { nullable: true })
  @Column({ type: DataType.INTEGER })
  age: number;

  @Field({ nullable: true })
  @Column({ type: DataType.STRING })
  addres: string;

  @Field()
  @Column({ type: DataType.STRING })
  image: string;

  @Field({ nullable: true })
  @Default('User')
  @Column({ type: DataType.STRING })
  roles: String;

  @Field({ nullable: false })
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  isAdmin: boolean;

  @Field({ nullable: false })
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  isActive: boolean;

  @Field(() => [UserRequest])
  @HasOne(() => UserRequest, {
    foreignKey: 'from',
  })
  userRequest: UserRequest[];

  @Field(() => [UserMessage])
  @HasMany(() => UserMessage, 'from')
  fromMessage: UserMessage[];

  @Field(() => [UserMessage])
  @HasMany(() => UserMessage, 'to')
  toMessage: UserMessage[];
}
