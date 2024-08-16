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
export class Appointment extends Document {
  @Prop({ required: true, unique: true })
  @ApiProperty({
    description: 'The unique identifier of the appointment',
    example: 1,
  })
  id: number;

  @Prop({ required: true })
  @ApiProperty({
    description: 'The ID of the patient associated with the appointment',
    example: 101,
  })
  patient_id: number;

  @Prop({ required: true })
  @ApiProperty({
    description: 'The name of the doctor for the appointment',
    example: 'Dr. Smith',
  })
  doctor: string;

  @Prop({ required: true })
  @IsUTCDateTime({
    message: 'appointment_date must be in ISO 8601 UTC format (ending with "Z")',
  })
  @ApiProperty({
    description: 'The date and time of the appointment',
    example: '2024-08-15T09:00:00.000Z',
  })
  appointment_date: Date;

  @Prop({ required: true })
  @ApiProperty({
    description: 'The reason for the appointment',
    example: 'Routine check-up',
  })
  reason: string;
}

const transformDocument = (ret: any) => {
  ret.id = ret.id || ret._id;
  delete ret._id;
  delete ret.__v;
  delete ret.createdAt;
  delete ret.updatedAt;
  return ret;
};

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);

AppointmentSchema.index({ id: 1 }, { unique: true });
