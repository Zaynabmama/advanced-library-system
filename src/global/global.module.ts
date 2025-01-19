import { Global, Module } from '@nestjs/common';
import { UploadService } from './services/upload.service';
import { EmailService } from './services/email.service';

@Global()
@Module({
  providers: [UploadService, EmailService],
  exports: [UploadService, EmailService],
})
export class GlobalModule {}
