import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { PuestoService } from './puesto.service';
import { CreatePuestoDto } from './dto/create-puesto.dto';
import { UpdatePuestoDto } from './dto/update-puesto.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('puesto')
export class PuestoController {
  constructor(private readonly puestoService: PuestoService) {}

  @Post()
  create(@Body() createPuestoDto: CreatePuestoDto) {
    return this.puestoService.create(createPuestoDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto) {
    return this.puestoService.findAll( paginationDto );
  }

  @Get(':term')
  findByTerm(@Param('term') term: string) {
    return this.puestoService.findByTerm(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updatePuestoDto: UpdatePuestoDto) {
    return this.puestoService.update(id, updatePuestoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.puestoService.remove(id);
  }
}
