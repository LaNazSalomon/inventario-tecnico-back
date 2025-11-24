import { 
  Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe 
} from '@nestjs/common';
import { TamanoPantallaService } from './tamano-pantalla.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateTamanoPantallaDto } from '../dto/create-tamano-pantalla.dto';
import { UpdateTamanoPantallaDto } from '../dto/update-tamano-pantalla.dto';

@Controller('tamano-pantalla')
export class TamanoPantallaController {
  constructor(private readonly tamanoService: TamanoPantallaService) {}

  @Post()
  create(@Body() createDto: CreateTamanoPantallaDto) {
    return this.tamanoService.create(createDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tamanoService.findAll(paginationDto);
  }

  @Get(':term')
  findByTerm(@Param('term') term: string, @Query() paginationDto: PaginationDto) {
    return this.tamanoService.findByTerm(term, paginationDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateTamanoPantallaDto,
  ) {
    return this.tamanoService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tamanoService.remove(id);
  }
}