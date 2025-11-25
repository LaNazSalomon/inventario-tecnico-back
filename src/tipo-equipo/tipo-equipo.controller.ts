import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { TipoEquipoService } from './tipo-equipo.service';
import { CreateTipoEquipoDto } from './dto/create-tipo-equipo.dto';
import { UpdateTipoEquipoDto } from './dto/update-tipo-equipo.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('tipo-equipo')
export class TipoEquipoController {
  constructor(private readonly tipoEquipoService: TipoEquipoService) {}

  @Post()
  create(@Body() createTipoEquipoDto: CreateTipoEquipoDto) {
    return this.tipoEquipoService.create(createTipoEquipoDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tipoEquipoService.findAll( paginationDto);
  }

  @Get(':term')
  findByTerm(@Param('term') term: string) {
    return this.tipoEquipoService.findByTerm(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTipoEquipoDto: UpdateTipoEquipoDto) {
    return this.tipoEquipoService.update(id, updateTipoEquipoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tipoEquipoService.remove(id);
  }
}
