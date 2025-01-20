import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true })
export class Book {
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
  totalCopies: number;

  @Prop({ required: true })
  authorId: Types.ObjectId;

  @Prop()
  coverImageUrl?: string;

  @Prop()
  bookPdfUrl?: string;

  @Prop({ default: false })
  isOpenForReviews: boolean;

  @Prop({ type: [{ branchId: Types.ObjectId, availableCopies: Number }], default: [] })
  branchDistribution: { branchId: Types.ObjectId; availableCopies: number }[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
