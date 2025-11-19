import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoVelocidadService } from './tipo-velocidad.service';
import { CreateTipoVelocidadDto } from './dto/create-tipo-velocidad.dto';
import { UpdateTipoVelocidadDto } from './dto/update-tipo-velocidad.dto';

@Controller('tipo-velocidad')
export class TipoVelocidadController {
  constructor(private readonly tipoVelocidadService: TipoVelocidadService) {}

  @Post()
  create(@Body() createTipoVelocidadDto: CreateTipoVelocidadDto) {
    return this.tipoVelocidadService.create(createTipoVelocidadDto);
  }

  @Get()
  findAll() {
    return this.tipoVelocidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoVelocidadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoVelocidadDto: UpdateTipoVelocidadDto) {
    return this.tipoVelocidadService.update(+id, updateTipoVelocidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoVelocidadService.remove(+id);
  }
}
