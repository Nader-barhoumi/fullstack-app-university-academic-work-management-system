import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DegreeProgramService } from './degree-programs.service';
import { CreateDegreeProgramDto } from './dto/create-degree-program.dto';
import { UpdateDegreeProgramDto } from './dto/update-degree-program.dto';

@Controller('degree-programs')
export class DegreeProgramsController {
  constructor(private readonly degreeProgramsService: DegreeProgramService) {}

  @Post()
  create(@Body() createDegreeProgramDto: CreateDegreeProgramDto) {
    return this.degreeProgramsService.create(createDegreeProgramDto);
  }

  @Get()
  findAll() {
    return this.degreeProgramsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.degreeProgramsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDegreeProgramDto: UpdateDegreeProgramDto) {
    return this.degreeProgramsService.update(+id, updateDegreeProgramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.degreeProgramsService.remove(+id);
  }
}
