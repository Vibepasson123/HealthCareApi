// src/patients/dto/patient-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class PatientResponseDto {
  @ApiProperty({
    description: 'The ID of the patient',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the patient',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The age of the patient',
    example: 30,
  })
  age: number;

  @ApiProperty({
    description: 'The gender of the patient',
    example: 'Male',
  })
  gender: string;

  @ApiProperty({
    description: 'The contact number of the patient',
    example: '123-456-7890',
  })
  contact: string;

  @ApiProperty({
    description: 'The NHS number of the patient',
    example: 'NHS123456',
  })
  nhs: string;
}
