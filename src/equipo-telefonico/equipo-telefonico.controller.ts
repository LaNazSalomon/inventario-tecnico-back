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
import { CreateEquipoTelefonicoDto } from './dto/create-equipo-telefonico.dto';
import { UpdateEquipoTelefonicoDto } from './dto/update-equipo-telefonico.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/users/decorators/auth.decorator';
import { EquipoTelefonicoService } from './equipo-telefonico.service';

@Controller('equipos-telefonicos')
@Auth()
export class EquipoTelefonicoController {
  constructor(
    private readonly equiposTelefonicosService: EquipoTelefonicoService,
  ) {}

  @Post()
  create(@Body() createDto: CreateEquipoTelefonicoDto) {
    return this.equiposTelefonicosService.create(createDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.equiposTelefonicosService.findAll(paginationDto);
  }

  @Get(':term')
  findByTerm(
    @Param('term') term: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.equiposTelefonicosService.findByTerm(term, paginationDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateEquipoTelefonicoDto,
  ) {
    return this.equiposTelefonicosService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equiposTelefonicosService.remove(id);
  }
}
