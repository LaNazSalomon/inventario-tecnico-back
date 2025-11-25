import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TecladoService } from './teclado.service';
import { CreateTecladoDto } from './dto/create-teclado.dto';
import { UpdateTecladoDto } from './dto/update-teclado.dto';

@Controller('teclado')
export class TecladoController {
  constructor(private readonly tecladoService: TecladoService) {}

  @Post()
  create(@Body() createTecladoDto: CreateTecladoDto) {
    return this.tecladoService.create(createTecladoDto);
  }

  @Get()
  findAll() {
    return this.tecladoService.findAll();
  }

  @Get(':term')
  findByTerm(@Param('term') term: string) {
    return this.tecladoService.findByTerm(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTecladoDto: UpdateTecladoDto) {
    return this.tecladoService.update(id, updateTecladoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tecladoService.remove(id);
  }
}
