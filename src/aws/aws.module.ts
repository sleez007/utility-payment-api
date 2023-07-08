import { Global, Module } from '@nestjs/common';
import { EmailService, AWSMailer } from './email/email.service';

@Global()
@Module({
  providers: [EmailService, AWSMailer],
  exports: [EmailService],
})
export class AwsModule {}
