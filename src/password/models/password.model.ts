import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Password extends Document {
  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  userId: string;
}

export const PasswordSchema = SchemaFactory.createForClass(Password);
