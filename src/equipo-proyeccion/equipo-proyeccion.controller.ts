import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { CreateEquipoProyeccionDto } from './dto/create-equipo-proyeccion.dto';
import { UpdateEquipoProyeccionDto } from './dto/update-equipo-proyeccion.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/users/decorators/auth.decorator';
import { EquipoProyeccionService } from './equipo-proyeccion.service';

@Controller('equipos-proyeccion')
@Auth()
export class EquipoProyeccionController {
  constructor(
    private readonly equiposProyeccionService: EquipoProyeccionService,
  ) {}

  @Post()
  create(@Body() createEquipoProyeccionDto: CreateEquipoProyeccionDto) {
    return this.equiposProyeccionService.create(createEquipoProyeccionDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.equiposProyeccionService.findAll(paginationDto);
  }

  //TODO: Quitar el ID para que pueda buscar por mas terminos
  @Get(':id')
  findByTerm(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.equiposProyeccionService.findByTerm(id, paginationDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEquipoProyeccionDto: UpdateEquipoProyeccionDto,
  ) {
    return this.equiposProyeccionService.update(id, updateEquipoProyeccionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.equiposProyeccionService.remove(id);
  }
}
