import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Language, UserType } from 'src/global/enums';


export type LocalizedText = {
  [key in Language]?: string;
};

export type AuthorDocument = HydratedDocument<Author>;

@Schema({ timestamps: true })
export class Author {
  @Prop({ required: true ,type: Object })
  name: LocalizedText;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  pinCode: string;

  @Prop({type: Object})
  biography: LocalizedText;
  
  @Prop()
  profileImageUrl: string;


  @Prop({ required: true, enum: UserType, default: UserType.Author })
  userType: UserType;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
