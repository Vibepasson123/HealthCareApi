import { Test, TestingModule } from '@nestjs/testing';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { NotFoundException } from '@nestjs/common';
import { Patient } from './schema/patient.schema'; // Import the Patient entity

describe('PatientsController', () => {
  let controller: PatientsController;
  let service: PatientsService;

  beforeEach(async () => {
    const serviceMock = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [
        {
          provide: PatientsService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<PatientsController>(PatientsController);
    service = module.get<PatientsService>(PatientsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new patient successfully', async () => {
      const createPatientDto: CreatePatientDto = {
        nhs: '1234567890',
        name: 'John Doe',
        age: 30,
        gender: 'Male',
        contact: '123-456-7890',
      };

      const newPatient: Patient = {
        id: 1,
        ...createPatientDto,
        // Mocking Mongoose methods
        save: jest.fn().mockResolvedValue({
          id: 1,
          ...createPatientDto,
          save: jest.fn(),
        }),
      } as unknown as Patient; // Cast to `Patient` type

      jest.spyOn(service, 'create').mockResolvedValue(newPatient);

      const result = await controller.create(createPatientDto);
      expect(result).toEqual(newPatient);
      expect(service.create).toHaveBeenCalledWith(createPatientDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of patients', async () => {
      const patients: Patient[] = [
        {
          id: 1,
          name: 'John Doe',
          age: 30,
          gender: 'Male',
          contact: '123-456-7890',
          nhs: '1234567890',
          // Mocking Mongoose methods
          save: jest.fn(),
        } as unknown as Patient,
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(patients);

      const result = await controller.findAll();
      expect(result).toEqual(patients);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a patient by ID', async () => {
      const patient: Patient = {
        id: 1,
        name: 'John Doe',
        age: 30,
        gender: 'Male',
        contact: '123-456-7890',
        nhs: '1234567890',
        // Mocking Mongoose methods
        save: jest.fn(),
      } as unknown as Patient;

      jest.spyOn(service, 'findOne').mockResolvedValue(patient);

      const result = await controller.findOne(1);
      expect(result).toEqual(patient);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if the patient with the given ID is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });
});
