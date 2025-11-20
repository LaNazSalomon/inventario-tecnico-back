import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModeloProcesadorService } from './modelo-procesador.service';
import { CreateModeloProcesadorDto } from './dto/create-modelo-procesador.dto';
import { UpdateModeloProcesadorDto } from './dto/update-modelo-procesador.dto';

@Controller('modelo-procesador')
export class ModeloProcesadorController {
  constructor(private readonly modeloProcesadorService: ModeloProcesadorService) {}

  @Post()
  create(@Body() createModeloProcesadorDto: CreateModeloProcesadorDto) {
    return this.modeloProcesadorService.create(createModeloProcesadorDto);
  }

  @Get()
  findAll() {
    return this.modeloProcesadorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modeloProcesadorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModeloProcesadorDto: UpdateModeloProcesadorDto) {
    return this.modeloProcesadorService.update(+id, updateModeloProcesadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modeloProcesadorService.remove(+id);
  }
}
