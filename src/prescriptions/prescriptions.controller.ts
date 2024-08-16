import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { FindPrescriptionDto } from './dto/find-prescription.dto';
import { PrescriptionsService } from './prescriptions.service';
import { Prescription } from './schema/prescription.schema';

@ApiTags('prescriptions')
@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new prescription' })
  @ApiBody({
    description: 'The prescription to create',
    type: CreatePrescriptionDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The prescription has been successfully created.',
    type: Prescription,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid input data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid or missing token.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authentication',
    required: true,
  })
  async create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionsService.create(createPrescriptionDto);
  }

  @Get()
  @ApiQuery({ name: 'patient_id', required: false, type: Number })
  @ApiQuery({ name: 'medication', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all prescriptions.',
    type: [Prescription],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  async findAll(@Query() query: FindPrescriptionDto) {
    return this.prescriptionsService.findWithFilters(
      query.patient_id,
      query.medication,
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the prescription',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the prescription.',
    type: Prescription,
  })
  @ApiResponse({
    status: 404,
    description: 'Prescription not found',
  })
  @UsePipes(new ParseIntPipe())
  async findOne(@Param('id') id: number) {

  const prescription =  this.prescriptionsService.findOne(id);

    return prescription;
  }
}
