import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnidadAcademicaService } from './unidad-academica.service';
import { CreateUnidadAcademicaDto } from './dto/create-unidad-academica.dto';
import { UpdateUnidadAcademicaDto } from './dto/update-unidad-academica.dto';

@Controller('unidad-academica')
export class UnidadAcademicaController {
  constructor(private readonly unidadAcademicaService: UnidadAcademicaService) {}

  @Post()
  create(@Body() createUnidadAcademicaDto: CreateUnidadAcademicaDto) {
    return this.unidadAcademicaService.create(createUnidadAcademicaDto);
  }

  @Get()
  findAll() {
    return this.unidadAcademicaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unidadAcademicaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnidadAcademicaDto: UpdateUnidadAcademicaDto) {
    return this.unidadAcademicaService.update(+id, updateUnidadAcademicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unidadAcademicaService.remove(+id);
  }
}
