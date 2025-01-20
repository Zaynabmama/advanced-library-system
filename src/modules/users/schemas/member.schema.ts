import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserType } from 'src/global/enums';

export type MemberDocument = HydratedDocument<Member>;

@Schema({ timestamps: true })
export class Member {
  
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  birthDate: Date;
  


  @Prop({ type: Number, default: 100 })
  returnRate: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'BorrowHistory' }] })
  borrowHistory: Types.ObjectId[];


  @Prop({ required: true, enum: UserType, default: UserType.Member })
  userType: UserType;


// add verification token laterr on
  // @Prop({ default: false })
  // isEmailVerified: boolean;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
