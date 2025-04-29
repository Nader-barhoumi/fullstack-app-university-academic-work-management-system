// src/states/states.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './entities/state.entity';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { StateDto } from './dto/state.dto';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}

  async create(createStateDto: CreateStateDto): Promise<StateDto> {
    const { code } = createStateDto;

    // Check for unique code
    const existingState = await this.stateRepository.findOne({ where: { code } });
    if (existingState) {
      throw new ConflictException(`State code '${code}' already exists`);
    }

    const state = this.stateRepository.create(createStateDto);
    const savedState = await this.stateRepository.save(state);
    return this.mapToDto(savedState);
  }

  async findAll(): Promise<StateDto[]> {
    const states = await this.stateRepository.find();
    return states.map(this.mapToDto);
  }

  async findOne(id: number): Promise<StateDto> {
    const state = await this.stateRepository.findOne({ where: { id } });
    if (!state) {
      throw new NotFoundException(`State with ID ${id} not found`);
    }
    return this.mapToDto(state);
  }

  async update(id: number, updateStateDto: UpdateStateDto): Promise<StateDto> {
    const state = await this.findOne(id); // Reuse findOne to check existence

    // Check for unique code if updated
    if (updateStateDto.code && updateStateDto.code !== state.code) {
      const existingState = await this.stateRepository.findOne({
        where: { code: updateStateDto.code },
      });
      if (existingState) {
        throw new ConflictException(`State code '${updateStateDto.code}' already exists`);
      }
    }

    const updatedState = await this.stateRepository.save({
      ...state,
      ...updateStateDto,
    });
    return this.mapToDto(updatedState);
  }

  async remove(id: number): Promise<void> {
    const state = await this.findOne(id); // Ensure state exists
    await this.stateRepository.remove(state);
  }

  private mapToDto(state: State): StateDto {
    return {
      id: state.id,
      name: state.name,
      code: state.code,
    };
  }
}