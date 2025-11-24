import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { TipoVelocidadService } from './tipo-velocidad.service';
import { CreateTipoVelocidadDto } from './dto/create-tipo-velocidad.dto';
import { UpdateTipoVelocidadDto } from './dto/update-tipo-velocidad.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('tipo-velocidad')
export class TipoVelocidadController {
  constructor(private readonly tipoVelocidadService: TipoVelocidadService) {}

  @Post()
  create(@Body() createTipoVelocidadDto: CreateTipoVelocidadDto) {
    return this.tipoVelocidadService.create(createTipoVelocidadDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto) {
    return this.tipoVelocidadService.findAll( paginationDto );
  }

  @Get(':term')
  findByTerm(@Param('term') term: string) {
    return this.tipoVelocidadService.findByTerm( term );
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTipoVelocidadDto: UpdateTipoVelocidadDto) {
    return this.tipoVelocidadService.update(id, updateTipoVelocidadDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tipoVelocidadService.remove(id);
  }
}
