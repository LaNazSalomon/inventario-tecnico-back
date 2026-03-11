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
import { EquiposImpresionService } from './equipos-impresion.service';
import { CreateEquiposImpresionDto } from './dto/create-equipos-impresion.dto';
import { UpdateEquiposImpresionDto } from './dto/update-equipos-impresion.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/users/decorators/auth.decorator';

@Controller('equipos-impresion')
@Auth()
export class EquiposImpresionController {
  constructor(
    private readonly equiposImpresionService: EquiposImpresionService,
  ) {}

  @Post()
  create(@Body() createEquipoImpresionDto: CreateEquiposImpresionDto) {
    return this.equiposImpresionService.create(createEquipoImpresionDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.equiposImpresionService.findAll(paginationDto);
  }

  @Get(':id')
  findByTerm(@Param('id', ParseUUIDPipe) id: string) {
    return this.equiposImpresionService.findByTerm(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEquipoImpresionDto: UpdateEquiposImpresionDto,
  ) {
    return this.equiposImpresionService.update(id, updateEquipoImpresionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.equiposImpresionService.remove(id);
  }
}