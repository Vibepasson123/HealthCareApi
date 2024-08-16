import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    versionKey: false,
    transform: (doc, ret) => transformDocument(ret),
  },
  toObject: {
    versionKey: false,
    transform: (doc, ret) => transformDocument(ret),
  },
})
export class Patient extends Document {
  @Prop({ required: true, unique: true })
  @ApiProperty({
    description: 'The unique identifier of the patient',
    example: 1,
  })
  id: number;

  @Prop({ required: true })
  @ApiProperty({
    description: 'The name of the patient',
    example: 'John Doe',
  })
  name: string;

  @Prop({ required: true })
  @ApiProperty({ description: 'The age of the patient', example: 30 })
  age: number;

  @Prop({ required: true })
  @ApiProperty({ description: 'The gender of the patient', example: 'Male' })
  gender: string;

  @Prop({ required: true })
  @ApiProperty({ description: 'The contact number of the patient', example: '+1234567890' })
  contact: string;

  @Prop({ required: true, unique: true })
  @ApiProperty({ description: 'The NHS number of the patient', example: '1234567890' })
  nhs: string;
}
const transformDocument = (ret: any) => {
  ret.id = ret.id || ret._id;
  delete ret._id;
  delete ret.__v;
  delete ret.createdAt;
  delete ret.updatedAt;
  return ret;
};

export const PatientSchema = SchemaFactory.createForClass(Patient);

PatientSchema.index({ id: 1 }, { unique: true });
