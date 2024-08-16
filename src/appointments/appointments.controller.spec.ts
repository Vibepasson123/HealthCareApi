import { ArgumentMetadata, BadRequestException, NotFoundException, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { FindAppointmentDto } from './dto/find-appointment.dto';
import { Appointment } from './schema/appointment.schema';

describe('AppointmentsController', () => {
  let controller: AppointmentsController;
  let service: AppointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentsController],
      providers: [
        {
          provide: AppointmentsService,
          useValue: {
            create: jest.fn(),
            findWithFilters: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AppointmentsController>(AppointmentsController);
    service = module.get<AppointmentsService>(AppointmentsService);

    const validationPipe = new ValidationPipe({ whitelist: true });
    controller['validationPipe'] = validationPipe;
  });

  describe('create', () => {
    it('should create a new appointment', async () => {
      const createAppointmentDto: CreateAppointmentDto = {
        patient_id: 1,
        doctor: 'Dr. Smith',
        appointment_date: String(new Date('2024-08-15T00:00:00Z')),
      };
      const result: Appointment = {
        id: 1,
        ...createAppointmentDto,
      } as any;

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createAppointmentDto)).toEqual(result);
    });

    it('should throw a BadRequestException if required fields are missing', async () => {
      const invalidDto: Partial<CreateAppointmentDto> = {
        // Missing required fields
      };
      const validationPipe = new ValidationPipe(); // Instantiate ValidationPipe

      // Simulate validation
      await expect(
        validationPipe.transform(
          invalidDto as any,
          {
            type: 'body',
            metatype: CreateAppointmentDto,
          } as ArgumentMetadata,
        ),
      ).rejects.toThrowError(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return a list of appointments', async () => {
      const query: FindAppointmentDto = {
        patient_id: 1,
        doctor: 'Dr. Smith',
      };
      const result: Appointment[] = [
        {
          id: 1,
          patient_id: 1,
          doctor: 'Dr. Smith',
          date: new Date('2024-08-15T00:00:00Z'),
        } as any,
      ];

      jest.spyOn(service, 'findWithFilters').mockResolvedValue(result);

      expect(await controller.findAll(query)).toEqual(result);
    });

    it('should return an empty list if no appointments match the filters', async () => {
      const query: FindAppointmentDto = {
        patient_id: 999, // Non-existent patient ID
      };
      const result: Appointment[] = [];

      jest.spyOn(service, 'findWithFilters').mockResolvedValue(result);

      expect(await controller.findAll(query)).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return an appointment by ID', async () => {
      const id = 1;
      const result: Appointment = {
        id,
        patient_id: 1,
        doctor: 'Dr. Smith',
        date: new Date('2024-08-15T00:00:00Z'),
      } as any;

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toEqual(result);
    });

    it('should throw a NotFoundException if appointment not found', async () => {
      const id = 1;
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(controller.findOne(id)).rejects.toThrow(new NotFoundException(`Appointment with ID ${id} not found`));
    });

    it('should throw a BadRequestException if ID is invalid', async () => {
      const id = NaN; // Invalid ID
      await expect(controller.findOne(id as any)).rejects.toThrow(new BadRequestException('Appointment with ID NaN not found'));
    });
  });
});
