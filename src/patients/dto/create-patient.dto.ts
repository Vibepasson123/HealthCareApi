import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Length } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the patient',
    example: 'John Doe',
  })
  name: string;

  @IsInt()
  @ApiProperty({
    description: 'The age of the patient',
    example: 30,
  })
  age: number;

  @IsString()
  @ApiProperty({
    description: 'The gender of the patient',
    example: 'Male',
  })
  gender: string;

  @IsString()
  @ApiProperty({
    description: 'The contact number of the patient',
    example: '123-456-7890',
  })
  contact: string;

  @IsString()
  @Length(1, 20)
  @ApiProperty({
    description: 'The NHS number of the patient',
    example: 'NHS123456',
  })
  nhs: string;
}
