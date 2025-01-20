import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type BranchDocument = HydratedDocument<Branch>;

@Schema({ timestamps: true })
export class Branch {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ default: 0 })
  totalBooks: number;

  @Prop({ type: [{ bookId: Types.ObjectId, availableCopies: Number }], default: [] })
  inventory: { bookId: Types.ObjectId; availableCopies: number }[];

  @Prop()
  location?: { latitude: number; longitude: number };
}

export const BranchSchema = SchemaFactory.createForClass(Branch);
