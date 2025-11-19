import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoProcesadorService } from './tipo-procesador.service';
import { CreateTipoProcesadorDto } from './dto/create-tipo-procesador.dto';
import { UpdateTipoProcesadorDto } from './dto/update-tipo-procesador.dto';

@Controller('tipo-procesador')
export class TipoProcesadorController {
  constructor(private readonly tipoProcesadorService: TipoProcesadorService) {}

  @Post()
  create(@Body() createTipoProcesadorDto: CreateTipoProcesadorDto) {
    return this.tipoProcesadorService.create(createTipoProcesadorDto);
  }

  @Get()
  findAll() {
    return this.tipoProcesadorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoProcesadorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoProcesadorDto: UpdateTipoProcesadorDto) {
    return this.tipoProcesadorService.update(+id, updateTipoProcesadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoProcesadorService.remove(+id);
  }
}
