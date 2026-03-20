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
import { TecladoService } from './teclado.service';
import { CreateTecladoDto } from './dto/create-teclado.dto';
import { UpdateTecladoDto } from './dto/update-teclado.dto';
import { Auth } from 'src/users/decorators/auth.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('teclado')
@Auth()
export class TecladoController {
  constructor(private readonly tecladoService: TecladoService) {}

  @Post()
  create(@Body() createTecladoDto: CreateTecladoDto) {
    return this.tecladoService.create(createTecladoDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tecladoService.findAll(paginationDto);
  }

  @Get(':term')
  findByTerm(
    @Param('term') term: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.tecladoService.findByTerm(term, paginationDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTecladoDto: UpdateTecladoDto) {
    return this.tecladoService.update(id, updateTecladoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tecladoService.remove(id);
  }
}
