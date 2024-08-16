import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatientResponseDto } from './dto/create-patient-response.dto';

@ApiTags('patients')
@Controller('patients')
@UseGuards(JwtAuthGuard)
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiBody({
    description: 'The patient to create',
    type: CreatePatientDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The patient has been successfully created.',
    type: PatientResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid input data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid or missing token.',
  })
  async create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all patients' })
  @ApiResponse({
    status: 200,
    description: 'List of patients',
    type: [PatientResponseDto],
  })
  async findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a patient by ID' })
  @ApiResponse({
    status: 200,
    description: 'The patient with the given ID',
    type: PatientResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found. The patient with the given ID was not found.',
  })
  @UsePipes(new ParseIntPipe())
  async findOne(@Param('id') id: number) {
    return this.patientsService.findOne(id);
  }
}
