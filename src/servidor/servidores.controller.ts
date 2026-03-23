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
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/users/decorators/auth.decorator';
import { CreateServidorDto } from './dto/create-servidor.dto';
import { ServidorService } from './servidores.service';
import { UpdateServidorDto } from './dto/update-servidore.dto';

@Controller('servidores')
@Auth()
export class ServidorController {
  constructor(private readonly servidorService: ServidorService) {}

  @Post()
  create(@Body() createServidorDto: CreateServidorDto) {
    return this.servidorService.create(createServidorDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.servidorService.findAll(paginationDto);
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.servidorService.findById(id);
  }

  @Get('search/:term')
  findByTerm(
    @Param('term') term: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.servidorService.findByTerm(term, paginationDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateServidorDto: UpdateServidorDto,
  ) {
    return this.servidorService.update(id, updateServidorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.servidorService.remove(id);
  }
}
