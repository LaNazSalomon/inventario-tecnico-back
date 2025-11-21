import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ArquitecturaSoService } from './arquitectura-so.service';
import { CreateArquitecturaSoDto } from './dto/create-arquitectura-so.dto';
import { UpdateArquitecturaSoDto } from './dto/update-arquitectura-so.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('arquitectura-so')
export class ArquitecturaSoController {
  constructor(private readonly arquitecturaSoService: ArquitecturaSoService) {}

  @Post()
  create(@Body() createArquitecturaSoDto: CreateArquitecturaSoDto) {
    return this.arquitecturaSoService.create(createArquitecturaSoDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto) {
    return this.arquitecturaSoService.findAll(paginationDto);
  }

  @Get(':term')
  findByTerm(@Param('term') term: string) {
    return this.arquitecturaSoService.findByTerm(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateArquitecturaSoDto: UpdateArquitecturaSoDto) {
    return this.arquitecturaSoService.update(id, updateArquitecturaSoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.arquitecturaSoService.remove(id);
  }
}
