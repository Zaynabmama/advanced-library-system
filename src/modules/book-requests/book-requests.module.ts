import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookRequest, BookRequestSchema } from './schemas/book-request.schema';
import { BookRequestsController } from './book-requests.controller';
import { BookRequestsService } from './book-requests.service';
import { UploadService } from 'src/global/services/upload.service';
import { BookModule } from '../book/book.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookRequest.name, schema: BookRequestSchema },
    ]),
    BookModule
  ],
  controllers: [BookRequestsController],
  providers: [BookRequestsService, UploadService],
})
export class BookRequestsModule {}
