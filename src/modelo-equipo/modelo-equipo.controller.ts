import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ModeloEquipoService } from './modelo-equipo.service';
import { CreateModeloEquipoDto } from './dto/create-modelo-equipo.dto';
import { UpdateModeloEquipoDto } from './dto/update-modelo-equipo.dto';
import { Auth } from 'src/users/decorators/auth.decorator';

@Controller('modelo-equipo')
@Auth()
export class ModeloEquipoController {
  constructor(private readonly modeloEquipoService: ModeloEquipoService) {}

  @Post()
  create(@Body() createDto: CreateModeloEquipoDto) {
    return this.modeloEquipoService.create(createDto);
  }

  @Get()
  findAll() {
    return this.modeloEquipoService.findAll();
  }

  @Get('search/:term')
  findByTerm(@Param('term') term: string) {
    return this.modeloEquipoService.findByTerm(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateModeloEquipoDto) {
    return this.modeloEquipoService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modeloEquipoService.remove(id);
  }
}
