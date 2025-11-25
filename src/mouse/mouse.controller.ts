import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { MouseService } from './mouse.service';
import { CreateMouseDto } from './dto/create-mouse.dto';
import { UpdateMouseDto } from './dto/update-mouse.dto';

@Controller('mouse')
export class MouseController {
  constructor(private readonly mouseService: MouseService) {}

  @Post()
  create(@Body() createMouseDto: CreateMouseDto) {
    return this.mouseService.create(createMouseDto);
  }

  @Get()
  findAll() {
    return this.mouseService.findAll();
  }

  @Get(':term')
  findByTerm(@Param('term') term: string) {
    return this.mouseService.findByTerm(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateMouseDto: UpdateMouseDto) {
    return this.mouseService.update(id, updateMouseDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.mouseService.remove(id);
  }
}
