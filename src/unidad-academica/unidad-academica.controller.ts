import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { UnidadAcademicaService } from './unidad-academica.service';
import { CreateUnidadAcademicaDto } from './dto/create-unidad-academica.dto';
import { UpdateUnidadAcademicaDto } from './dto/update-unidad-academica.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/users/decorators/auth.decorator';

@Controller('unidad-academica')
@Auth()
export class UnidadAcademicaController {
  constructor(private readonly unidadAcademicaService: UnidadAcademicaService) {}

  @Post()
  create(@Body() createUnidadAcademicaDto: CreateUnidadAcademicaDto) {
    return this.unidadAcademicaService.create(createUnidadAcademicaDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.unidadAcademicaService.findAll( paginationDto );
  }

  @Get(':id')
  findByTerm(@Param('term') term: string) {
    return this.unidadAcademicaService.findByTerm(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUnidadAcademicaDto: UpdateUnidadAcademicaDto) {
    return this.unidadAcademicaService.update(id, updateUnidadAcademicaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.unidadAcademicaService.remove( id );
  }
}
