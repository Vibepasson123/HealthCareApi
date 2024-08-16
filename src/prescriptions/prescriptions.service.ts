import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Prescription } from './schema/prescription.schema';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { PatientsService } from 'src/patients/patients.service';
import { IdSequenceService } from 'src/id-sequence/id-sequence.service';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectModel(Prescription.name)
    private readonly prescriptionModel: Model<Prescription>,
    private readonly patientsService: PatientsService,
    private idSequenceService: IdSequenceService,
  ) {}

  async create(
    createPrescriptionDto: CreatePrescriptionDto,
  ): Promise<Prescription> {
   
    const patientExists = await this.patientsService.findOne(createPrescriptionDto.patient_id,);
    if (!patientExists) {
      throw new NotFoundException(`Patient with ID ${createPrescriptionDto.patient_id} not found`,);
    }
    const nextId = await this.idSequenceService.getNextSequenceValue('prescriptions');
    const prescription = new this.prescriptionModel({...createPrescriptionDto,id: nextId, });
    return prescription.save();
  }

  async findAll(): Promise<Prescription[]> {
    return this.prescriptionModel.find().exec();
  }

  async findOne(id: number): Promise<Prescription> {
    const prescription = await this.prescriptionModel.findOne({ id }).exec();
    if (!prescription) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }
    return prescription;
  }
  async findWithFilters( patient_id?: number,medication?: string,): Promise<Prescription[]> {
    const filters: FilterQuery<Prescription> = {};
    if (patient_id) {filters.patient_id = patient_id;}
    if (medication) {filters.medication = medication;}
    return this.prescriptionModel.find(filters).exec();
  }
}
