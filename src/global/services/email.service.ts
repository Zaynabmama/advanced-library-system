import { Injectable } from '@nestjs/common'; 
import * as nodemailer from 'nodemailer';
import * as pug from 'pug';
import * as path from 'path';

@Injectable()
export class EmailService {
  private transporter: any;

  constructor() {

    this.transporter = nodemailer.createTransport({
      service: process.env.MAILER_SERVICE,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });
  }

  async sendOtpEmail(email: string, otp: string): Promise<void> {
    const html = this.renderTemplate('otp-email.pug', { otp });

    await this.transporter.sendMail({
      to: email,
      subject: 'Your OTP Code',
      html,
    });
  }

  async sendCmsPasswordEmail(email: string, password: string): Promise<void> {
    const html = this.renderTemplate('cms-password-email.pug', { password });

    await this.transporter.sendMail({
      to: email,
      subject: 'Your CMS Password',
      html,
    });
  }

  async sendAuthorPinEmail(email: string, pin: string): Promise<void> {
    const html = this.renderTemplate('author-pin-email.pug', { pin });

    await this.transporter.sendMail({
      to: email,
      subject: 'Your Author PIN Code',
      html,
    });
  }

  private renderTemplate(templateName: string, variables: Record<string, any>): string {
    const templatePath = path.join(__dirname, '..', 'templates', templateName);
    return pug.renderFile(templatePath, variables);
  }
}
