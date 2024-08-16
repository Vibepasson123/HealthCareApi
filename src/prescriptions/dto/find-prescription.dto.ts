import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FindPrescriptionDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    description: 'The ID of the patient',
    required: false,
    type: Number,
  })
  patient_id?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The medication name',
    required: false,
    type: String,
  })
  medication?: string;
}
