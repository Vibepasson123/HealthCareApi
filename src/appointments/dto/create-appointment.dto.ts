import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'The ID of the patient for the appointment',
    example: 123,
  })
  @IsNumber()
  @IsNotEmpty()
  patient_id: number;

  @ApiProperty({
    description: 'The name of the doctor for the appointment',
    example: 'Dr. Smith',
  })
  @IsString()
  @IsNotEmpty()
  doctor: string;

  @ApiProperty({
    description: 'The date and time of the appointment in ISO 8601 format',
    example: '2024-08-15T10:00:00Z',
  })
  @IsString()
  @IsNotEmpty()
  appointment_date: string;

  @ApiProperty({
    description: 'The reason for the appointment',
    example: 'Regular check-up',
    required: false,
  })
  @IsString()
  @IsOptional()
  reason?: string;
}
