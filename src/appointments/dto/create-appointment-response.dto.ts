// src/appointments/dto/create-appointment-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentResponseDto {
  @ApiProperty({
    description: 'The ID of the appointment',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The ID of the patient for the appointment',
    example: 123,
  })
  patient_id: number;

  @ApiProperty({
    description: 'The name of the doctor for the appointment',
    example: 'Dr. Smith',
  })
  doctor: string;

  @ApiProperty({
    description: 'The date and time of the appointment in ISO 8601 format',
    example: '2024-08-15T10:00:00Z',
  })
  appointment_date: string;

  @ApiProperty({
    description: 'The reason for the appointment',
    example: 'Regular check-up',
    required: false,
  })
  reason?: string;
}
