import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BorrowHistoryDocument = HydratedDocument<BorrowHistory>;

@Schema({ timestamps: true })
export class BorrowHistory {
  @Prop({ type: Types.ObjectId, ref: 'Member', required: true })
  memberId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  bookId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
  branchId: Types.ObjectId;

  @Prop({ required: true })
  borrowDate: Date;

  @Prop({ required: true })
  returnDate: Date;

  @Prop({ default: false })
  isReturned: boolean;

  @Prop({ default: false })
  isOverdue: boolean;
}

export const BorrowHistorySchema = SchemaFactory.createForClass(BorrowHistory);
