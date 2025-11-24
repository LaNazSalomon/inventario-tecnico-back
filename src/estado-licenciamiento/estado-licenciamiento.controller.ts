import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { EstadoLicenciamientoService } from './estado-licenciamiento.service';
import { CreateEstadoLicenciamientoDto } from './dto/create-estado-licenciamiento.dto';
import { UpdateEstadoLicenciamientoDto } from './dto/update-estado-licenciamiento.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('estado-licenciamiento')
export class EstadoLicenciamientoController {
  constructor(private readonly estadoLicenciamientoService: EstadoLicenciamientoService) {}

  @Post()
  create(@Body() createEstadoLicenciamientoDto: CreateEstadoLicenciamientoDto) {
    return this.estadoLicenciamientoService.create(createEstadoLicenciamientoDto);
  }

  @Get()
  findAll( @Query() PaginationDto: PaginationDto) {
    return this.estadoLicenciamientoService.findAll(PaginationDto);
  }

  @Get(':term')
  findByTerm(@Param('term') term: string) {
    return this.estadoLicenciamientoService.findByTerm(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEstadoLicenciamientoDto: UpdateEstadoLicenciamientoDto) {
    return this.estadoLicenciamientoService.update(id, updateEstadoLicenciamientoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.estadoLicenciamientoService.remove(id);
  }
}
