// src/patients/patients.service.ts
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './schema/patient.schema';
import { IdSequenceService } from 'src/id-sequence/id-sequence.service';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private readonly patientModel: Model<Patient>,
    private idSequenceService: IdSequenceService,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const existingPatient = await this.patientModel
      .findOne({ nhs: createPatientDto.nhs })
      .exec();
    if (existingPatient) {
      throw new ConflictException(
        'A patient with this NHS number already exists.',
      );
    }
    const nextId =
      await this.idSequenceService.getNextSequenceValue('patients');
    const newPatient = new this.patientModel({
      id: nextId,
      ...createPatientDto,
    });
    return newPatient.save();
  }

  async findAll(): Promise<Patient[]> {
    return this.patientModel.find().exec();
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientModel.findOne({ id }).exec();
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }
}
