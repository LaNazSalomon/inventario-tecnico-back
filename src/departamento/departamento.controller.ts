import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { DepartamentoService } from './departamento.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from '../users/decorators/auth.decorator';

@Controller('departamento')
@Auth()
export class DepartamentoController {
  constructor(private readonly departamentoService: DepartamentoService) {}

  @Post()
  create(@Body() createDepartamentoDto: CreateDepartamentoDto) {
    return this.departamentoService.create(createDepartamentoDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto) {
    return this.departamentoService.findAll( paginationDto );
  }

  @Get(':id')
  findByTerm(@Param('id', ParseUUIDPipe) id: string) {
    return this.departamentoService.findByTerm(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDepartamentoDto: UpdateDepartamentoDto) {
    return this.departamentoService.update(id, updateDepartamentoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.departamentoService.remove(id);
  }
}
