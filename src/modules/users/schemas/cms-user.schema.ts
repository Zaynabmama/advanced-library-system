import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserType } from 'src/global/enums';

export type CmsUserDocument = HydratedDocument<CmsUser>;

@Schema({ timestamps: true })
export class CmsUser {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'Role'}) 
  roleId: Types.ObjectId;

  @Prop({ required: true, enum: UserType, default: UserType.CMS })
  userType: UserType; 

  readonly _id: Types.ObjectId;
}

export const CmsUserSchema = SchemaFactory.createForClass(CmsUser);
