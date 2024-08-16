import { Module } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { PrescriptionsController } from './prescriptions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Prescription, PrescriptionSchema } from './schema/prescription.schema';
import { PatientsModule } from 'src/patients/patients.module';
import { IdSequenceModule } from 'src/id-sequence/id-sequence.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Prescription.name, schema: PrescriptionSchema },
    ]),
    PatientsModule,
    IdSequenceModule,
  ],
  providers: [PrescriptionsService],
  controllers: [PrescriptionsController],
})
export class PrescriptionsModule {}
