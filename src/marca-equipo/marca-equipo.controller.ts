import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarcaEquipoService } from './marca-equipo.service';
import { CreateMarcaEquipoDto } from './dto/create-marca-equipo.dto';
import { UpdateMarcaEquipoDto } from './dto/update-marca-equipo.dto';

@Controller('marca-equipo')
export class MarcaEquipoController {
  constructor(private readonly marcaEquipoService: MarcaEquipoService) {}

  @Post()
  create(@Body() createMarcaEquipoDto: CreateMarcaEquipoDto) {
    return this.marcaEquipoService.create(createMarcaEquipoDto);
  }

  @Get()
  findAll() {
    return this.marcaEquipoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marcaEquipoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarcaEquipoDto: UpdateMarcaEquipoDto) {
    return this.marcaEquipoService.update(+id, updateMarcaEquipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marcaEquipoService.remove(+id);
  }
}
