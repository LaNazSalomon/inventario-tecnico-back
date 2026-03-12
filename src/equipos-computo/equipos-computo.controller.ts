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
import { EquiposComputoService } from './equipos-computo.service';
import { CreateEquiposComputoDto } from './dto/create-equipos-computo.dto';
import { UpdateEquiposComputoDto } from './dto/update-equipos-computo.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/users/decorators/auth.decorator';
import { UnidadAcademicaFilterDto } from './dto/unidad-academica-filter.dto';

@Controller('equipos-computo')
@Auth()
export class EquiposComputoController {
  constructor(private readonly equiposComputoService: EquiposComputoService) {}

  @Post()
  create(@Body() createEquiposComputoDto: CreateEquiposComputoDto) {
    return this.equiposComputoService.create(createEquiposComputoDto);
  }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query() filterDto: UnidadAcademicaFilterDto,
  ) {
    return this.equiposComputoService.findAll(
      paginationDto,
      filterDto.unidadAcademicaId,
    );
  }

  @Get(':id')
  findByTerm(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() filterDto: UnidadAcademicaFilterDto,
  ) {
    return this.equiposComputoService.findByTerm(
      id,
      filterDto.unidadAcademicaId,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEquiposComputoDto: UpdateEquiposComputoDto,
  ) {
    return this.equiposComputoService.update(id, updateEquiposComputoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.equiposComputoService.remove(id);
  }
}
