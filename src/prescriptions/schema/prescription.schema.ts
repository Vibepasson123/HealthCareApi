import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { IsUTCDateTime } from 'src/utils/validators/is-utc-date-time.validator';

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
export class Prescription extends Document {
  @Prop({ required: true, unique: true })
  @ApiProperty({
    description: 'The unique identifier of the prescription',
    example: 1,
  })
  id: number;

  @Prop({ required: true })
  @ApiProperty({
    description: 'The patient ID associated with the prescription',
    example: 101,
  })
  patient_id: number;

  @Prop({ required: true })
  @ApiProperty({ description: 'The medication name', example: 'Aspirin' })
  medication: string;

  @Prop({ required: true })
  @ApiProperty({ description: 'The dosage of the medication', example: '500mg' })
  dosage: string;

  @Prop({ required: true })
  @IsUTCDateTime({
    message: 'prescribed_date must be in ISO 8601 UTC format (ending with "Z")',
  })
  @ApiProperty({
    description: 'The date of the prescription',
    example: '2024-08-15T00:00:00.000Z',
  })
  prescribed_date: Date;
}

const transformDocument = (ret: any) => {
  ret.id = ret.id || ret._id;
  delete ret._id;
  delete ret.__v;
  delete ret.createdAt; 
  delete ret.updatedAt; 
  return ret;
};

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription);

PrescriptionSchema.index({ id: 1 }, { unique: true });
