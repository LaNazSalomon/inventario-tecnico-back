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
import { MouseService } from './mouse.service';
import { CreateMouseDto } from './dto/create-mouse.dto';
import { UpdateMouseDto } from './dto/update-mouse.dto';
import { Auth } from 'src/users/decorators/auth.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('mouse')
@Auth()
export class MouseController {
  constructor(private readonly mouseService: MouseService) {}

  @Post()
  create(@Body() createMouseDto: CreateMouseDto) {
    return this.mouseService.create(createMouseDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.mouseService.findAll(paginationDto);
  }

  @Get(':term')
  findByTerm(
    @Param('term') term: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.mouseService.findByTerm(term, paginationDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMouseDto: UpdateMouseDto,
  ) {
    return this.mouseService.update(id, updateMouseDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.mouseService.remove(id);
  }
}
