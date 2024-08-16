import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAppointmentDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  patient_id?: number;

  @IsOptional()
  @IsString()
  doctor?: string;
}
