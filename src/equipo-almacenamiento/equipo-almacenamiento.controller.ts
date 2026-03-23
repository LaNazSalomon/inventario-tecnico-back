import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EquipoAlmacenamientoService } from './equipo-almacenamiento.service';
import { CreateEquipoAlmacenamientoDto } from './dto/create-equipo-almacenamiento.dto';
import { UpdateEquipoAlmacenamientoDto } from './dto/update-equipo-almacenamiento.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/users/decorators/auth.decorator';

@Controller('equipos-almacenamiento')
@Auth()
export class EquipoAlmacenamientoController {
  constructor(
    private readonly equiposAlmacenamientoService: EquipoAlmacenamientoService,
  ) {}

  @Post()
  create(@Body() createDto: CreateEquipoAlmacenamientoDto) {
    return this.equiposAlmacenamientoService.create(createDto);
  }
@Get()
findAll(@Query() query: PaginationDto) {
  return this.equiposAlmacenamientoService.findAll(query);
}

  @Get(':term')
  findByTerm(
    @Param('term') term: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.equiposAlmacenamientoService.findByTerm(term, paginationDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateEquipoAlmacenamientoDto,
  ) {
    return this.equiposAlmacenamientoService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equiposAlmacenamientoService.remove(id);
  }
}
