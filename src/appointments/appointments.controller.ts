import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query, UsePipes } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentResponseDto } from './dto/create-appointment-response.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { FindAppointmentDto } from './dto/find-appointment.dto';
import { Appointment } from './schema/appointment.schema';

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiBody({
    description: 'The appointment to create',
    type: CreateAppointmentDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The appointment has been successfully created.',
    type: CreateAppointmentResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid input data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid or missing token.',
  })
  async create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all appointments' })
  @ApiResponse({
    status: 200,
    description: 'List of appointments',
    type: [CreateAppointmentResponseDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid query parameters.',
  })
  async findAll(@Query() query: FindAppointmentDto) {
    return this.appointmentsService.findWithFilters(query.patient_id, query.doctor);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an appointment by ID' })
  @ApiResponse({
    status: 200,
    description: 'The appointment with the given ID',
    type: CreateAppointmentResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found. The appointment with the given ID was not found.',
  })
  @UsePipes(new ParseIntPipe())
  async findOne(@Param('id') id: number): Promise<Appointment> {
    const appointment = await this.appointmentsService.findOne(id);
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }
}
