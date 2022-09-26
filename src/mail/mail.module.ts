import { Module , Global} from '@nestjs/common';
import { MailService } from './mail.service';

@Global()
@Module({
  providers: [MailService],
})
export class MailModule {}
