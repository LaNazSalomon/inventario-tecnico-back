import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArquitecturaSoService } from './arquitectura-so.service';
import { CreateArquitecturaSoDto } from './dto/create-arquitectura-so.dto';
import { UpdateArquitecturaSoDto } from './dto/update-arquitectura-so.dto';

@Controller('arquitectura-so')
export class ArquitecturaSoController {
  constructor(private readonly arquitecturaSoService: ArquitecturaSoService) {}

  @Post()
  create(@Body() createArquitecturaSoDto: CreateArquitecturaSoDto) {
    return this.arquitecturaSoService.create(createArquitecturaSoDto);
  }

  @Get()
  findAll() {
    return this.arquitecturaSoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.arquitecturaSoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArquitecturaSoDto: UpdateArquitecturaSoDto) {
    return this.arquitecturaSoService.update(+id, updateArquitecturaSoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.arquitecturaSoService.remove(+id);
  }
}
