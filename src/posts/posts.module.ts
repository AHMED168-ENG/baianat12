import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostModel } from './models/post.model';

@Module({
  imports: [SequelizeModule.forFeature([PostModel])],
  providers: [PostsService, PostsResolver],
})
export class PostModule {}
