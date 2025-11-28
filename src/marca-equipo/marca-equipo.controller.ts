import { Controller, Get, Post, Body, Param, Delete, Query, Patch } from '@nestjs/common';
import { MarcaEquipoService } from './marca-equipo.service';
import { CreateMarcaEquipoDto } from './dto/create-marca-equipo.dto';
import { UpdateMarcaEquipoDto } from './dto/update-marca-equipo.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/users/decorators/auth.decorator';

@Controller('marca-equipo')
@Auth()
export class MarcaEquipoController {
  constructor(private readonly marcaEquipoService: MarcaEquipoService) {}

  @Post()
  create(@Body() createDto: CreateMarcaEquipoDto) {
    return this.marcaEquipoService.create(createDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.marcaEquipoService.findAll(paginationDto);
  }

  @Get(':term')
  findByTerm(@Param('term') term: string) {
    return this.marcaEquipoService.findByTerm(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateMarcaEquipoDto) {
    return this.marcaEquipoService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marcaEquipoService.remove(id);
  }
}
