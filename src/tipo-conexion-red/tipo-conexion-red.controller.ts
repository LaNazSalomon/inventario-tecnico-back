import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { TipoConexionRedService } from './tipo-conexion-red.service';
import { CreateTipoConexionRedDto } from './dto/create-tipo-conexion-red.dto';
import { UpdateTipoConexionRedDto } from './dto/update-tipo-conexion-red.dto';

@Controller('tipo-conexion-red')
export class TipoConexionRedController {
  constructor(private readonly tipoConexionRedService: TipoConexionRedService) {}

  @Post()
  create(@Body() createTipoConexionRedDto: CreateTipoConexionRedDto) {
    return this.tipoConexionRedService.create(createTipoConexionRedDto);
  }

  @Get()
  findAll() {
    return this.tipoConexionRedService.findAll();
  }

  @Get(':term')
  findByTerm(@Param('term') term: string) {
    return this.tipoConexionRedService.findByTerm(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTipoConexionRedDto: UpdateTipoConexionRedDto) {
    return this.tipoConexionRedService.update(id, updateTipoConexionRedDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tipoConexionRedService.remove(id);
  }
}
