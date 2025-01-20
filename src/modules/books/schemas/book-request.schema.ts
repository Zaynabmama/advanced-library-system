import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type BookRequestDocument = HydratedDocument<BookRequest>;

@Schema({ timestamps: true })
export class BookRequest {
  @Prop({ required: true })
  authorId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true, unique: true })
  ISBN: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  minimumAge: number;

  @Prop({ required: true })
  requestedCopies: number;

  @Prop()
  coverImageUrl?: string;

  @Prop()
  bookPdfUrl?: string;

  @Prop({ default: 'Pending', enum: ['Pending', 'Approved', 'Rejected'] })
  status: string;

  @Prop()
  approvalDate?: Date;

}

export const BookRequestSchema = SchemaFactory.createForClass(BookRequest);
