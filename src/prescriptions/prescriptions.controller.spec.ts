import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionsController } from './prescriptions.controller';
import { PrescriptionsService } from './prescriptions.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { FindPrescriptionDto } from './dto/find-prescription.dto';

import { NotFoundException } from '@nestjs/common';
import { Prescription } from './schema/prescription.schema';

describe('PrescriptionsController', () => {
  let controller: PrescriptionsController;
  let service: PrescriptionsService;

  beforeEach(async () => {
    const serviceMock = {
      create: jest.fn(),
      findWithFilters: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrescriptionsController],
      providers: [
        {
          provide: PrescriptionsService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<PrescriptionsController>(PrescriptionsController);
    service = module.get<PrescriptionsService>(PrescriptionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new prescription successfully', async () => {
      const createPrescriptionDto: CreatePrescriptionDto = {
        patient_id: 1,
        medication: 'Amoxicillin',
        dosage: '500mg',
        prescribed_date: String(Date.now()),
        //frequency: 'Twice a day',
        //duration: '7 days',
      };


      const newPrescription: Prescription = {
        id: 1,
        ...createPrescriptionDto,
        // Mocking Mongoose methods
        save: jest.fn().mockResolvedValue({
          id: 1,
          ...createPrescriptionDto,
          save: jest.fn(),
        }),
      } as unknown as Prescription; // Cast to `Prescription` type

      jest.spyOn(service, 'create').mockResolvedValue(newPrescription);

      const result = await controller.create(createPrescriptionDto);
      expect(result).toEqual(newPrescription);
      expect(service.create).toHaveBeenCalledWith(createPrescriptionDto);
    });
  });

  describe('findAll', () => {
    it('should return a list of prescriptions filtered by query parameters', async () => {
      const query: FindPrescriptionDto = {
        patient_id: 1,
        medication: 'Amoxicillin',
      };

      const prescriptions: Prescription[] = [
        {
          id: 1,
          patient_id: 1,
          medication: 'Amoxicillin',
          dosage: '500mg',
          duration: '7 days',
          save: jest.fn(),
        } as unknown as Prescription,
      ];

      jest.spyOn(service, 'findWithFilters').mockResolvedValue(prescriptions);

      const result = await controller.findAll(query);
      expect(result).toEqual(prescriptions);
      expect(service.findWithFilters).toHaveBeenCalledWith(query.patient_id, query.medication);
    });

    it('should return an empty list if no prescriptions match the filters', async () => {
      const query: FindPrescriptionDto = {
        patient_id: 999, // Non-existent patient ID
        medication: 'NonExistentMed',
      };

      const result: Prescription[] = [];

      jest.spyOn(service, 'findWithFilters').mockResolvedValue(result);

      expect(await controller.findAll(query)).toEqual(result);
      expect(service.findWithFilters).toHaveBeenCalledWith(query.patient_id, query.medication);
    });
  });

  describe('findOne', () => {
    it('should return a prescription by ID', async () => {
      const id = 1;
      const prescription: Prescription = {
        id,
        patient_id: 1,
        doctor: 'Dr. Smith',
        medication: 'Amoxicillin',
        dosage: '500mg',
        frequency: 'Twice a day',
        duration: '7 days',
        // Mocking Mongoose methods
        save: jest.fn(),
      } as unknown as Prescription;
  
      jest.spyOn(service, 'findOne').mockResolvedValue(prescription);
  
      const result = await controller.findOne(id);
      expect(result).toEqual(prescription);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });
});
