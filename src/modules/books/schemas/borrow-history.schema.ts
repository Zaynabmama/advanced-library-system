import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type BorrowHistoryDocument = HydratedDocument<BorrowHistory>;

@Schema({ timestamps: true })
export class BorrowHistory {
  @Prop({ required: true })
  memberId: Types.ObjectId;

  @Prop({ required: true })
  bookId: Types.ObjectId;

  @Prop({ required: true })
  branchId: Types.ObjectId;

  @Prop({ required: true })
  borrowDate: Date;

  @Prop({ required: true })
  returnDeadline: Date;

  @Prop({ default: false })
  isReturned: boolean;

  @Prop()
  returnedDate?: Date;

  @Prop({ default: false })
  isOverdue: boolean;
}

export const BorrowHistorySchema = SchemaFactory.createForClass(BorrowHistory);
