import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class IdSequence extends Document {
  @Prop({ required: true, unique: true })
  sequenceName: string;

  @Prop({ required: true })
  sequenceValue: number;
}

export const IdSequenceSchema = SchemaFactory.createForClass(IdSequence);
