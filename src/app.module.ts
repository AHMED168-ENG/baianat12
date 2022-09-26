import { Module } from '@nestjs/common';
import { configrationSit } from './common/configratin';
import { graphqlConfig } from './common/graphql.configratin';
import { sequelizeCofigration } from './common/sequelize.configration';
// import { uploadFile } from './uploadFile/uploadFile';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/authoraization.Guard';
import { PostModule } from './posts/posts.module';
import { PostCommectModule } from './post-commect/post-commect.module';
import { PostReactionModule } from './post-reaction/post-reaction.module';
import { UserFrindsModule } from './user-frinds/user-frinds.module';
import { UserRequestModule } from './user-request/user-request.module';
import { ConversationModule } from './conversation/conversation.module';
import { UserMessageModule } from './user-message/user-message.module';
import { Roles } from './common/Roles';
import { DateScalar } from './scalars/scalars';
import { uploadFile } from './uploadFile/uploadFile';

@Module({
  imports: [
    configrationSit,
    graphqlConfig,
    sequelizeCofigration,
    UserModule,
    AuthModule,
    AuthModule,
    MailModule,
    PostModule,
    PostCommectModule,
    PostReactionModule,
    UserFrindsModule,
    UserRequestModule,
    ConversationModule,
    UserMessageModule,
  ],
  providers: [
    uploadFile,
    // DateScalar,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
