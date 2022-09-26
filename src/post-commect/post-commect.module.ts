import { Module } from '@nestjs/common';
import { PostCommectService } from './post-commect.service';
import { PostCommectResolver } from './post-commect.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostCommectModel } from './models/post-commect.model';

@Module({
  imports: [SequelizeModule.forFeature([PostCommectModel])],
  providers: [PostCommectService, PostCommectResolver],
})
export class PostCommectModule {}
