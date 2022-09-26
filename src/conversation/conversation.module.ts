import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationResolver } from './conversation.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConversationModel } from './model/conversation.model';


@Module({
  imports: [SequelizeModule.forFeature([ConversationModel])],
  providers: [ConversationResolver, ConversationService],
})
export class ConversationModule {}
