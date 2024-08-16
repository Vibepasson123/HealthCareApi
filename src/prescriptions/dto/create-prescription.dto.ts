import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreatePrescriptionDto {
  @ApiProperty({
    description: 'The ID of the patient for whom the prescription is created',
    example: 123,
  })
  @IsInt()
  patient_id: number;

  @ApiProperty({
    description: 'The name of the medication prescribed',
    example: 'Aspirin',
  })
  @IsString()
  medication: string;
  @ApiProperty({
    description: 'The dosage of the medication',
    example: '500mg',
  })
  @IsString()
  dosage: string;

  @ApiProperty({
    description: 'The date when the prescription was issued',
    example: '2024-08-15T00:00:00.000Z',
  })
  @IsString()
  prescribed_date: string;
}
