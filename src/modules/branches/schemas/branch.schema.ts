import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BranchDocument = HydratedDocument<Branch>;

@Schema({ timestamps: true })
export class Branch {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({
    type: [
      {
        bookId: { type: Types.ObjectId, ref: 'Book' },
        availableCopies: Number,
        borrowableDays: Number,
      },
    ],
    default: [],
  })
  inventory: {
    bookId: Types.ObjectId;
    availableCopies: number;
    borrowableDays?: number;
  }[];
  
  @Prop({ default: 0 })
  totalBooks: number;

  @Prop({ type: { latitude: Number, longitude: Number }, _id: false, required: false })
  location?: { latitude: number; longitude: number };
}

export const BranchSchema = SchemaFactory.createForClass(Branch);
