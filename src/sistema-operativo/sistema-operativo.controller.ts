import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SistemaOperativoService } from './sistema-operativo.service';
import { CreateSistemaOperativoDto } from './dto/create-sistema-operativo.dto';
import { UpdateSistemaOperativoDto } from './dto/update-sistema-operativo.dto';

@Controller('sistema-operativo')
export class SistemaOperativoController {
  constructor(private readonly sistemaOperativoService: SistemaOperativoService) {}

  @Post()
  create(@Body() createSistemaOperativoDto: CreateSistemaOperativoDto) {
    return this.sistemaOperativoService.create(createSistemaOperativoDto);
  }

  @Get()
  findAll() {
    return this.sistemaOperativoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sistemaOperativoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSistemaOperativoDto: UpdateSistemaOperativoDto) {
    return this.sistemaOperativoService.update(+id, updateSistemaOperativoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sistemaOperativoService.remove(+id);
  }
}
