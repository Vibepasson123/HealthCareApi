import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PrescriptionsService } from './prescriptions.service';
import { Prescription } from './schema/prescription.schema';
import { IdSequenceService } from 'src/id-sequence/id-sequence.service';
import { PatientsService } from 'src/patients/patients.service';
import { NotFoundException } from '@nestjs/common';
import { randomInt } from 'crypto';

describe('PrescriptionsService', () => {
  let service: PrescriptionsService;
  let prescriptionModel: any;
  let idSequenceService: any;
  let patientsService: any;

  beforeEach(async () => {
    const saveMock = jest.fn();

    // I have created this Mock constructor function for prescriptionModel
    prescriptionModel = jest.fn(() => ({
      save: saveMock,
    }));

    idSequenceService = {
      getNextSequenceValue: jest.fn(),
    };

    patientsService = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrescriptionsService,
        {
          provide: getModelToken(Prescription.name),
          useValue: prescriptionModel,
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

    service = module.get<PrescriptionsService>(PrescriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a prescription', async () => {
      const createPrescriptionDto = {
        patient_id: 1,
        medication: 'Aspirin',
        dosage: '500mg',
        prescribed_date: new Date().toISOString(),
      };

      const nextId = randomInt(2);
      const newPrescription = { id: nextId, ...createPrescriptionDto };
      patientsService.findOne.mockResolvedValue(1); 
      idSequenceService.getNextSequenceValue.mockResolvedValue(nextId);

      const saveMock = jest.fn().mockResolvedValue(newPrescription);
      prescriptionModel.mockImplementationOnce(() => ({
        save: saveMock,
      }));

      const result = await service.create(createPrescriptionDto);
      expect(result).toEqual(newPrescription);
      expect(patientsService.findOne).toHaveBeenCalledWith(createPrescriptionDto.patient_id);
      expect(idSequenceService.getNextSequenceValue).toHaveBeenCalledWith('prescriptions');
      expect(prescriptionModel).toHaveBeenCalledWith({
        id: nextId,
        ...createPrescriptionDto,
      });
      expect(saveMock).toHaveBeenCalled();
    });

    it('should throw a NotFoundException if the patient does not exist', async () => {
      const createPrescriptionDto = {
        patient_id: 1,
        medication: 'Aspirin',
        dosage: '500mg',
        prescribed_date: new Date().toISOString(),
      };

      // Mocking `findOne` to return null if the patient does not exist
      patientsService.findOne.mockResolvedValue(null);

      await expect(service.create(createPrescriptionDto)).rejects.toThrow(
        new NotFoundException(
          `Patient with ID ${createPrescriptionDto.patient_id} not found`,
        ),
      );
    });
  });

  // Add other tests for findAll, findWithFilters, and findOne if needed
});
