import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { TipoAlmacenamientoExtraibleService } from './tipo-almacenamiento-extraible.service';
import { CreateTipoAlmacenamientoExtraibleDto } from './dto/create-tipo-almacenamiento-extraible.dto';
import { UpdateTipoAlmacenamientoExtraibleDto } from './dto/update-tipo-almacenamiento-extraible.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/users/decorators/auth.decorator';

@Controller('tipo-almacenamiento-extraible')
@Auth()
export class TipoAlmacenamientoExtraibleController {
  constructor(private readonly tipoAlmacenamientoExtraibleService: TipoAlmacenamientoExtraibleService) {}

  @Post()
  create(@Body() createTipoAlmacenamientoExtraibleDto: CreateTipoAlmacenamientoExtraibleDto) {
    return this.tipoAlmacenamientoExtraibleService.create(createTipoAlmacenamientoExtraibleDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto) {
    return this.tipoAlmacenamientoExtraibleService.findAll( paginationDto);
  }

  @Get(':term')
  findByTerm(@Param('term') term: string) {
    return this.tipoAlmacenamientoExtraibleService.findByTerm(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTipoAlmacenamientoExtraibleDto: UpdateTipoAlmacenamientoExtraibleDto) {
    return this.tipoAlmacenamientoExtraibleService.update( id, updateTipoAlmacenamientoExtraibleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tipoAlmacenamientoExtraibleService.remove( id );
  }
}
