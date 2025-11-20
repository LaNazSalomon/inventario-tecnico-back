import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadosSoService } from './estados-so.service';
import { CreateEstadosSoDto } from './dto/create-estados-so.dto';
import { UpdateEstadosSoDto } from './dto/update-estados-so.dto';

@Controller('estados-so')
export class EstadosSoController {
  constructor(private readonly estadosSoService: EstadosSoService) {}

  @Post()
  create(@Body() createEstadosSoDto: CreateEstadosSoDto) {
    return this.estadosSoService.create(createEstadosSoDto);
  }

  @Get()
  findAll() {
    return this.estadosSoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadosSoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadosSoDto: UpdateEstadosSoDto) {
    return this.estadosSoService.update(+id, updateEstadosSoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadosSoService.remove(+id);
  }
}
