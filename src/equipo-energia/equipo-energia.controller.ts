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
import { EquipoEnergiaService } from './equipo-energia.service';
import { CreateEquipoEnergiaDto } from './dto/create-equipo-energia.dto';
import { UpdateEquipoEnergiaDto } from './dto/update-equipo-energia.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/users/decorators/auth.decorator';

@Controller('equipos-energia')
@Auth()
export class EquipoEnergiaController {
  constructor(private readonly equiposEnergiaService: EquipoEnergiaService) {}

  @Post()
  create(@Body() createDto: CreateEquipoEnergiaDto) {
    return this.equiposEnergiaService.create(createDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.equiposEnergiaService.findAll(paginationDto);
  }

  @Get(':term')
  findByTerm(
    @Param('term') term: string,
    @Query() paginationDto: PaginationDto,
  ) {
    // Aquí aceptamos tanto UUID como búsquedas avanzadas
    return this.equiposEnergiaService.findByTerm(term, paginationDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateEquipoEnergiaDto) {
    return this.equiposEnergiaService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equiposEnergiaService.remove(id);
  }
}
