import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsUTCDateTime } from 'src/utils/validators/is-utc-date-time.validator';


@Schema({
  timestamps: true,
  toJSON: {
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret.id || ret._id;
      delete ret._id;
      delete ret.__v;
      return {
        id: ret.id,
        patient_id: ret.patient_id,
        doctor: ret.doctor,
        appointment_date: ret.appointment_date,
        reason: ret.reason,
      };
    },
  },
  toObject: {
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret.id || ret._id;
      delete ret._id;
      delete ret.__v;
      return {
        id: ret.id,
        patient_id: ret.patient_id,
        doctor: ret.doctor,
        appointment_date: ret.appointment_date,
        reason: ret.reason,
      };
    },
  },
})
export class Appointment extends Document {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  patient_id: number;

  @Prop({ required: true })
  doctor: string;

  @Prop({ required: true })
  @IsUTCDateTime({
    message:
      'appointment_date must be in ISO 8601 UTC format (ending with "Z")',
  })
  appointment_date: Date;

  @Prop({ required: true })
  reason: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);

AppointmentSchema.index({ id: 1 }, { unique: true });
