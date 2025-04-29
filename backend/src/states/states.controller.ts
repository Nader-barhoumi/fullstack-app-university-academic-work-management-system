// src/states/states.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { StatesService } from './states.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { StateDto } from './dto/state.dto';

@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Post()
  async create(@Body() createStateDto: CreateStateDto): Promise<StateDto> {
    return this.statesService.create(createStateDto);
  }

  @Get()
  async findAll(): Promise<StateDto[]> {
    return this.statesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<StateDto> {
    return this.statesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStateDto: UpdateStateDto,
  ): Promise<StateDto> {
    return this.statesService.update(id, updateStateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.statesService.remove(id);
  }
}