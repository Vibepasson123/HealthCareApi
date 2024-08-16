import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './schema/appointment.schema';
import { IdSequenceService } from 'src/id-sequence/id-sequence.service';
import { PatientsService } from 'src/patients/patients.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
    private idSequenceService: IdSequenceService,
    private readonly patientsService: PatientsService,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const patient = await this.patientsService.findOne(
      createAppointmentDto.patient_id,
    );

    if (!patient) {
      throw new NotFoundException(
        `Patient with ID ${createAppointmentDto.patient_id} not found`,
      );
    }
    const nextId =
      await this.idSequenceService.getNextSequenceValue('appointments');
    const appointment = new this.appointmentModel({
      id: nextId,
      ...createAppointmentDto,
    });
    return appointment.save();
  }
  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel.find().exec();
  }

  async findWithFilters(
    patient_id?: number,
    doctor?: string,
  ): Promise<Appointment[]> {
    const filters: any = {};
    if (patient_id) {
      filters.patient_id = patient_id;
    }
    if (doctor) {
      filters.doctor = doctor;
    }
    return this.appointmentModel.find(filters).exec();
  }

  async findOne(id: number): Promise<any> {
    const appointment = await this.appointmentModel.findOne({ id }).exec();
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }
}
