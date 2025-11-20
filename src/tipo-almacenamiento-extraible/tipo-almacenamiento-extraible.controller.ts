import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoAlmacenamientoExtraibleService } from './tipo-almacenamiento-extraible.service';
import { CreateTipoAlmacenamientoExtraibleDto } from './dto/create-tipo-almacenamiento-extraible.dto';
import { UpdateTipoAlmacenamientoExtraibleDto } from './dto/update-tipo-almacenamiento-extraible.dto';

@Controller('tipo-almacenamiento-extraible')
export class TipoAlmacenamientoExtraibleController {
  constructor(private readonly tipoAlmacenamientoExtraibleService: TipoAlmacenamientoExtraibleService) {}

  @Post()
  create(@Body() createTipoAlmacenamientoExtraibleDto: CreateTipoAlmacenamientoExtraibleDto) {
    return this.tipoAlmacenamientoExtraibleService.create(createTipoAlmacenamientoExtraibleDto);
  }

  @Get()
  findAll() {
    return this.tipoAlmacenamientoExtraibleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoAlmacenamientoExtraibleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoAlmacenamientoExtraibleDto: UpdateTipoAlmacenamientoExtraibleDto) {
    return this.tipoAlmacenamientoExtraibleService.update(+id, updateTipoAlmacenamientoExtraibleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoAlmacenamientoExtraibleService.remove(+id);
  }
}
