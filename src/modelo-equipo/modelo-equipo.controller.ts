import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModeloEquipoService } from './modelo-equipo.service';
import { CreateModeloEquipoDto } from './dto/create-modelo-equipo.dto';
import { UpdateModeloEquipoDto } from './dto/update-modelo-equipo.dto';

@Controller('modelo-equipo')
export class ModeloEquipoController {
  constructor(private readonly modeloEquipoService: ModeloEquipoService) {}

  @Post()
  create(@Body() createModeloEquipoDto: CreateModeloEquipoDto) {
    return this.modeloEquipoService.create(createModeloEquipoDto);
  }

  @Get()
  findAll() {
    return this.modeloEquipoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modeloEquipoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModeloEquipoDto: UpdateModeloEquipoDto) {
    return this.modeloEquipoService.update(+id, updateModeloEquipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modeloEquipoService.remove(+id);
  }
}
