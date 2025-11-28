import { 
  Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe 
} from '@nestjs/common';
import { CreateTipoPantallaDto } from './dto/create-tipo-pantalla.dto';
import { UpdateTipoPantallaDto } from './dto/update-tipo-pantalla.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { TipoPantallaService } from './tipo-pantalla.service';
import { Auth } from 'src/users/decorators/auth.decorator';

@Controller('tipo-pantalla')
@Auth()
export class TipoPantallaController {
  constructor(private readonly tipoPantallaService: TipoPantallaService) {}

  @Post()
  create(@Body() createDto: CreateTipoPantallaDto) {
    return this.tipoPantallaService.create(createDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tipoPantallaService.findAll(paginationDto);
  }

  @Get(':term')
  findByTerm(@Param('term') term: string) {
    return this.tipoPantallaService.findByTerm(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateTipoPantallaDto,
  ) {
    return this.tipoPantallaService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tipoPantallaService.remove(id);
  }
}