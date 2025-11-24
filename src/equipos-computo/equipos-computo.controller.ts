import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { EquiposComputoService } from './equipos-computo.service';
import { CreateEquiposComputoDto } from './dto/create-equipos-computo.dto';
import { UpdateEquiposComputoDto } from './dto/update-equipos-computo.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('equipos-computo')
export class EquiposComputoController {
  constructor(private readonly equiposComputoService: EquiposComputoService) {}

  @Post()
  create(@Body() createEquiposComputoDto: CreateEquiposComputoDto) {
    return this.equiposComputoService.create(createEquiposComputoDto);
  }

  @Get()
  findAll(paginationDto: PaginationDto) {
    return this.equiposComputoService.findAll(paginationDto);
  }

  @Get(':id')
  findByTerm(@Param('id', ParseUUIDPipe) id: string) {
    return this.equiposComputoService.findByTerm(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquiposComputoDto: UpdateEquiposComputoDto) {
    return this.equiposComputoService.update(id, updateEquiposComputoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.equiposComputoService.remove(id);
  }
}
