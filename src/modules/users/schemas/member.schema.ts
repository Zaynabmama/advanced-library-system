import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
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

  @Prop({ default: [] })
  subscribedBooks: string[];

  @Prop({ default: [] })
  borrowedBooks: Array<{
    borrowedBookId: string;
    borrowedDate: Date;
    returnDate: Date;
  }>;

  @Prop({ default: 100 })
  returnRate: number;

  @Prop({ required: true, enum: UserType, default: UserType.Member })
  userType: UserType;


// add verification token laterr on
  // @Prop({ default: false })
  // isEmailVerified: boolean;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
