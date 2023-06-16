import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FeedbackDocument = HydratedDocument<Feedback>;

@Schema()
export class Feedback {
  @Prop()
  name: string;

  @Prop()
  content: string;

  @Prop()
  time: Date;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
