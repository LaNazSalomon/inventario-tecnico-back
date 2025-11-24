import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { VersionSoService } from './version-so.service';
import { CreateVersionSoDto } from './dto/create-version-so.dto';
import { UpdateVersionSoDto } from './dto/update-version-so.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('version-so')
export class VersionSoController {
  constructor(private readonly versionSoService: VersionSoService) {}

  @Post()
  create(@Body() createVersionSoDto: CreateVersionSoDto) {
    return this.versionSoService.create(createVersionSoDto);
  }

  @Get()
  findAll(@Query() PaginationDto: PaginationDto) {
    return this.versionSoService.findAll(PaginationDto);
  }

  @Get(':term')
  findByTerm(@Param('term') term: string) {
    return this.versionSoService.findByTerm(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateVersionSoDto: UpdateVersionSoDto,
  ) {
    return this.versionSoService.update(id, updateVersionSoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.versionSoService.remove(id);
  }
}
