import { 
  Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe 
} from '@nestjs/common';
import { ResolucionPantallaService } from './resolucion-pantalla.service';
import { CreateResolucionPantallaDto } from './dto/create-resolucion-pantalla.dto';
import { UpdateResolucionPantallaDto } from './dto/update-resolucion-pantalla.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('resolucion-pantalla')
export class ResolucionPantallaController {
  constructor(private readonly resolucionService: ResolucionPantallaService) {}

  @Post()
  create(@Body() createDto: CreateResolucionPantallaDto) {
    return this.resolucionService.create(createDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.resolucionService.findAll(paginationDto);
  }

  @Get(':term')
  findByTerm(@Param('term') term: string, @Query() paginationDto: PaginationDto) {
    return this.resolucionService.findByTerm(term, paginationDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateResolucionPantallaDto,
  ) {
    return this.resolucionService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.resolucionService.remove(id);
  }
}