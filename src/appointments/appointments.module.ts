import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { Appointment, AppointmentSchema } from './schema/appointment.schema';

import { IdSequenceModule } from 'src/id-sequence/id-sequence.module';
import { PatientsModule } from 'src/patients/patients.module';
import { Patient, PatientSchema } from 'src/patients/schema/patient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
      { name: Patient.name, schema: PatientSchema },
    ]),
    PatientsModule,
    IdSequenceModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
