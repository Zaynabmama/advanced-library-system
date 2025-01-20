import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
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

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Book' }] })
  books: Types.ObjectId[];


  @Prop({ required: true, enum: UserType, default: UserType.Author })
  userType: UserType;

  readonly _id: Types.ObjectId;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
