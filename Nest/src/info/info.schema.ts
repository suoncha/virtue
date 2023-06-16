import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InfoDocument = HydratedDocument<Info>;

@Schema()
export class Info {
  @Prop()
  username: string;

  @Prop()
  saveNo: number;

  @Prop()
  hpRate: number;

  @Prop()
  win: number;

  @Prop()
  death: number;

  @Prop()
  plays: number;
}

export const InfoSchema = SchemaFactory.createForClass(Info);
