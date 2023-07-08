import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
AWS.config.update({ region: 'eu-west-3' });

export abstract class EmailClient {
  abstract sendEmail(
    recipients: string[], //[kingsley@gmail.com, '', '']
    subject: string,
    message: string,
    replyTo?: string[],
    bcc?: string[],
    source?: string,
  ): Promise<boolean>;
}

@Injectable()
export class AWSMailer implements EmailClient {
  private ses: AWS.SES;
  constructor(private config: ConfigService) {
    //super();
    const SES_CONFIG = {
      apiVersion: config.get('AWS_API_VERSION'),
      accessKeyId: config.get('AWS_ACCESS_KEY'),
      secretAccessKey: config.get('AWS_SECRET_ACCESS_KEY'),
      region: config.get('AWS_REGION'),
    };
    this.ses = new AWS.SES(SES_CONFIG);
  }

  async sendEmail(
    recipients: string[] = [],
    subject: string,
    message: string,
    replyTo: string[] = [],
    bcc: string[] = [],
    source = this.config.get('NO_REPLY_EMAIL'),
  ): Promise<boolean> {
    const params: AWS.SES.SendEmailRequest = {
      Destination: {
        ToAddresses: recipients,
        BccAddresses: bcc,
      },
      ReplyToAddresses: replyTo,
      Message: {
        Body: {
          Html: {
            // HTML Format of the email
            Charset: 'UTF-8',
            Data: message,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: source,
    };
    try {
      await this.ses.sendEmail(params).promise();
      return true;
    } catch (e) {
      console.log(e);
      // Add a logger to log to the failure db
      return false;
    }
  }
}

@Injectable()
export class EmailService {
  constructor(@Inject(AWSMailer) private readonly mailer: EmailClient) {}

  async sendWelcomeEmail(
    recipient: string,
    subject: string,
    recipientName: string,
  ) {
    const message = `
        <p>Hi ${recipientName}, Wea are glad to have you onboard</p>
        <p>Welcome to the pandora utility payment platform</p>
    `;
    const result = await this.mailer.sendEmail([recipient], subject, message);
    return result;
  }

  async sendOtp(recipient: string, subject: string, otpCode: string) {
    const message = `
        <p>Hello, your otp code is ${otpCode}/p>
        <p>It will expore in 5 minutes</p>
    `;
    const result = await this.mailer.sendEmail([recipient], subject, message);
    return result;
  }
}
