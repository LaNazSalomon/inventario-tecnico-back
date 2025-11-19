import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquiposComputoService } from './equipos-computo.service';
import { CreateEquiposComputoDto } from './dto/create-equipos-computo.dto';
import { UpdateEquiposComputoDto } from './dto/update-equipos-computo.dto';

@Controller('equipos-computo')
export class EquiposComputoController {
  constructor(private readonly equiposComputoService: EquiposComputoService) {}

  @Post()
  create(@Body() createEquiposComputoDto: CreateEquiposComputoDto) {
    return this.equiposComputoService.create(createEquiposComputoDto);
  }

  @Get()
  findAll() {
    return this.equiposComputoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equiposComputoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquiposComputoDto: UpdateEquiposComputoDto) {
    return this.equiposComputoService.update(+id, updateEquiposComputoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equiposComputoService.remove(+id);
  }
}
