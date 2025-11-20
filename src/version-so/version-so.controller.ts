import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VersionSoService } from './version-so.service';
import { CreateVersionSoDto } from './dto/create-version-so.dto';
import { UpdateVersionSoDto } from './dto/update-version-so.dto';

@Controller('version-so')
export class VersionSoController {
  constructor(private readonly versionSoService: VersionSoService) {}

  @Post()
  create(@Body() createVersionSoDto: CreateVersionSoDto) {
    return this.versionSoService.create(createVersionSoDto);
  }

  @Get()
  findAll() {
    return this.versionSoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.versionSoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVersionSoDto: UpdateVersionSoDto) {
    return this.versionSoService.update(+id, updateVersionSoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.versionSoService.remove(+id);
  }
}
