import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ModeloProcesadorService } from './modelo-procesador.service';
import { CreateModeloProcesadorDto } from './dto/create-modelo-procesador.dto';
import { UpdateModeloProcesadorDto } from './dto/update-modelo-procesador.dto';
import { Auth } from 'src/users/decorators/auth.decorator';

@Controller('modelo-procesador')
@Auth()
export class ModeloProcesadorController {
  constructor(private readonly modeloProcesadorService: ModeloProcesadorService) {}

  @Post()
  create(@Body() createModeloProcesadorDto: CreateModeloProcesadorDto) {
    return this.modeloProcesadorService.create(createModeloProcesadorDto);
  }

  @Get()
  findAll() {
    return this.modeloProcesadorService.findAll();
  }

  @Get(':term')
  findByTerm(@Param('term') term: string) {
    return this.modeloProcesadorService.findByTerm(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateModeloProcesadorDto: UpdateModeloProcesadorDto,
  ) {
    return this.modeloProcesadorService.update(id, updateModeloProcesadorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.modeloProcesadorService.remove(id);
  }
}