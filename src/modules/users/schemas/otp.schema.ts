import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';


export type OtpDocument = HydratedDocument<Otp>;

@Schema({ timestamps: true })
export class Otp {
  @Prop()
  otp: string;


  @Prop({ required: true })
  email: string;

  @Prop({ default: Date.now, expires: 600 }) 
  createdAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);


