import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PatientsService } from './patients.service';
import { Patient } from './schema/patient.schema';
import { IdSequenceService } from '../id-sequence/id-sequence.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('PatientsService', () => {
  let service: PatientsService;
  let patientModel: any;
  let idSequenceService: any;

  beforeEach(async () => {
    const patientModelMock = {
      findOne: jest.fn(),
      find: jest.fn(),
      exec: jest.fn(),
      save: jest.fn(),
    };

    // Create a mock constructor function for patientModel
    patientModel = jest.fn(() => ({
      save: jest.fn(),
    }));
    
    patientModel.findOne = patientModelMock.findOne;
    patientModel.find = patientModelMock.find;

    idSequenceService = {
      getNextSequenceValue: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientsService,
        {
          provide: getModelToken(Patient.name),
          useValue: patientModel,
        },
        {
          provide: IdSequenceService,
          useValue: idSequenceService,
        },
      ],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new patient successfully', async () => {
      const createPatientDto = { nhs: '1234567890', name: 'John Doe',age:31,gender: 'male',contact:'1234-6754'};
      const newPatient = { id: 1, ...createPatientDto };

      patientModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      });
      idSequenceService.getNextSequenceValue.mockResolvedValue(1);

      // Mock the instance created by the patientModel constructor
      const saveMock = jest.fn().mockResolvedValue(newPatient);
      patientModel.mockImplementationOnce(() => ({
        save: saveMock,
      }));

      const result = await service.create(createPatientDto);
      expect(result).toEqual(newPatient);
      expect(patientModel).toHaveBeenCalledWith({
        id: 1,
        ...createPatientDto,
      });
      expect(saveMock).toHaveBeenCalled();
    });


    it('should throw a ConflictException if a patient with the given NHS number already exists', async () => {
      const createPatientDto = { nhs: '1234567890', name: 'John Doe',age:31,gender: 'male',contact:'1234-6754'};
      const existingPatient = { id: 1, ...createPatientDto };

      patientModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(existingPatient),
      });

      await expect(service.create(createPatientDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return an array of patients', async () => {
      const patients = [{ id: 1, name: 'John Doe', nhs: '1234567890' }];

      patientModel.find.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(patients),
      });

      const result = await service.findAll();
      expect(result).toEqual(patients);
    });
  });

  describe('findOne', () => {
    it('should return a patient by ID', async () => {
      const patient = { id: 1, name: 'John Doe', nhs: '1234567890' };

      patientModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(patient),
      });

      const result = await service.findOne(1);
      expect(result).toEqual(patient);
      expect(patientModel.findOne).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw a NotFoundException if a patient with the given ID is not found', async () => {
      patientModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
      expect(patientModel.findOne).toHaveBeenCalledWith({ id: 1 });
    });
  });
});
