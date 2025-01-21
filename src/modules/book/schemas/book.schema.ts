import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true, unique: true })
  isbn: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: true })
  isOpenForReview: boolean;

  @Prop({ required: true })
  minAgeRequirement: number;

  @Prop({ required: true })
  pdfUrl: string;

  @Prop({ required: true })
  coverImageUrl: string;

  @Prop()
  totalCopies: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
