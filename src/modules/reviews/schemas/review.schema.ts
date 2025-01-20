import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true })
  memberId: Types.ObjectId;

  @Prop({ required: true })
  bookId: Types.ObjectId;

  @Prop({ required: true })
  comment: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ default: 0 })
  likes: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
