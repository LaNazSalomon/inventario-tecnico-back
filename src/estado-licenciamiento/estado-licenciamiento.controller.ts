import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoLicenciamientoService } from './estado-licenciamiento.service';
import { CreateEstadoLicenciamientoDto } from './dto/create-estado-licenciamiento.dto';
import { UpdateEstadoLicenciamientoDto } from './dto/update-estado-licenciamiento.dto';

@Controller('estado-licenciamiento')
export class EstadoLicenciamientoController {
  constructor(private readonly estadoLicenciamientoService: EstadoLicenciamientoService) {}

  @Post()
  create(@Body() createEstadoLicenciamientoDto: CreateEstadoLicenciamientoDto) {
    return this.estadoLicenciamientoService.create(createEstadoLicenciamientoDto);
  }

  @Get()
  findAll() {
    return this.estadoLicenciamientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoLicenciamientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoLicenciamientoDto: UpdateEstadoLicenciamientoDto) {
    return this.estadoLicenciamientoService.update(+id, updateEstadoLicenciamientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoLicenciamientoService.remove(+id);
  }
}
