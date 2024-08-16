import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './schema/appointment.schema';
import { IdSequenceService } from 'src/id-sequence/id-sequence.service';
import { PatientsService } from 'src/patients/patients.service';
import { NotFoundException } from '@nestjs/common';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  let appointmentModel: any;
  let idSequenceService: any;
  let patientsService: any;

  beforeEach(async () => {
    const appointmentModelMock = {
      findOne: jest.fn(),
      find: jest.fn(),
      exec: jest.fn(),
      save: jest.fn(),
    };

    // Create a mock constructor function for appointmentModel
    appointmentModel = jest.fn(() => ({
      save: jest.fn(),
    }));

    appointmentModel.findOne = appointmentModelMock.findOne;
    appointmentModel.find = appointmentModelMock.find;

    idSequenceService = {
      getNextSequenceValue: jest.fn(),
    };

    patientsService = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        {
          provide: getModelToken(Appointment.name),
          useValue: appointmentModel,
        },
        {
          provide: IdSequenceService,
          useValue: idSequenceService,
        },
        {
          provide: PatientsService,
          useValue: patientsService,
        },
      ],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create an appointment', async () => {
      const createAppointmentDto = {
        patient_id: 1,
        doctor: 'Dr. Smith',
        appointment_date: String(new Date()),
      };
      const patient = { _id: 'patientId', name: 'John Doe' };
      const nextId = 1;
      const newAppointment = { id: nextId, ...createAppointmentDto };

      patientsService.findOne.mockResolvedValue(patient);
      idSequenceService.getNextSequenceValue.mockResolvedValue(nextId);

      const saveMock = jest.fn().mockResolvedValue(newAppointment);
      appointmentModel.mockImplementationOnce(() => ({
        save: saveMock,
      }));

      const result = await service.create(createAppointmentDto);
      expect(result).toEqual(newAppointment);
      expect(patientsService.findOne).toHaveBeenCalledWith(createAppointmentDto.patient_id);
      expect(idSequenceService.getNextSequenceValue).toHaveBeenCalledWith('appointments');
      expect(appointmentModel).toHaveBeenCalledWith({
        id: nextId,
        ...createAppointmentDto,
      });
      expect(saveMock).toHaveBeenCalled();
    });

    it('should throw a NotFoundException if the patient does not exist', async () => {
      const createAppointmentDto = {
        patient_id: 999,
        doctor: 'Dr. Smith',
        appointment_date: String(new Date()),
      };

      patientsService.findOne.mockResolvedValue(null);

      await expect(service.create(createAppointmentDto)).rejects.toThrow(
        new NotFoundException(
          `Patient with ID ${createAppointmentDto.patient_id} not found`,
        ),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of appointments', async () => {
      const appointments = [
        { id: 1, patient_id: 1, doctor: 'Dr. Smith', appointment_date: String(new Date()) },
      ];

      appointmentModel.find.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(appointments),
      });

      const result = await service.findAll();
      expect(result).toEqual(appointments);
    });
  });

  describe('findWithFilters', () => {
    it('should return filtered appointments', async () => {
      const appointments = [
        { id: 1, patient_id: 1, doctor: 'Dr. Smith', appointment_date: String(new Date())},
      ];

      appointmentModel.find.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(appointments),
      });

      const result = await service.findWithFilters(1, 'Dr. Smith');
      expect(result).toEqual(appointments);
    });

    it('should return filtered appointments with only patient_id', async () => {
      const appointments = [
        { id: 1, patient_id: 1, doctor: 'Dr. Smith', appointment_date: String(new Date()) },
      ];

      appointmentModel.find.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(appointments),
      });

      const result = await service.findWithFilters(1);
      expect(result).toEqual(appointments);
    });

    it('should return filtered appointments with only doctor', async () => {
      const appointments = [
        { id: 1, patient_id: 1, doctor: 'Dr. Smith', appointment_date: String(new Date()) },
      ];

      appointmentModel.find.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(appointments),
      });

      const result = await service.findWithFilters(undefined, 'Dr. Smith');
      expect(result).toEqual(appointments);
    });
  });

  describe('findOne', () => {
    it('should return an appointment if it exists', async () => {
      const appointment = { id: 1, patient_id: 1, doctor: 'Dr. Smith', appointment_date: String(new Date()) };

      appointmentModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(appointment),
      });

      const result = await service.findOne(1);
      expect(result).toEqual(appointment);
      expect(appointmentModel.findOne).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw a NotFoundException if the appointment does not exist', async () => {
      appointmentModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findOne(999)).rejects.toThrow(
        new NotFoundException(`Appointment with ID 999 not found`),
      );
      expect(appointmentModel.findOne).toHaveBeenCalledWith({ id: 999 });
    });
  });
});
