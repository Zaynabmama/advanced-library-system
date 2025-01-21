import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BookRequestDocument = HydratedDocument<BookRequest>;

@Schema({ timestamps: true })
export class BookRequest {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  isbn: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  minimumAge: number;

  @Prop({ required: true })
  requestedCopies: number;

  @Prop({ type: Types.ObjectId, ref: 'Author', required: true })
  authorId: Types.ObjectId;

  @Prop({ required: true })
  pdfUrl: string;

  @Prop({ required: true })
  coverImageUrl: string;

  @Prop({ enum: ['pending', 'approved', 'rejected'], default: 'pending' })
  status: string;

  @Prop({ type: Date })
  approvalDate?: Date;
}

export const BookRequestSchema = SchemaFactory.createForClass(BookRequest);
