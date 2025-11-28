import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query, 
  ParseUUIDPipe 
} from '@nestjs/common';
import { EstadoFuncionamientoService } from './estado-funcionamiento.service';
import { CreateEstadoFuncionamientoDto } from './dto/create-estado-funcionamiento.dto';
import { UpdateEstadoFuncionamientoDto } from './dto/update-estado-funcionamiento.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/users/decorators/auth.decorator';

@Controller('estado-funcionamiento')
@Auth()
export class EstadoFuncionamientoController {
  constructor(
    private readonly estadoFuncionamientoService: EstadoFuncionamientoService,
  ) {}

  @Post()
  create(@Body() createEstadoFuncionamientoDto: CreateEstadoFuncionamientoDto) {
    return this.estadoFuncionamientoService.create(createEstadoFuncionamientoDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.estadoFuncionamientoService.findAll(paginationDto);
  }

  @Get(':term')
  findByTerm(@Param('term') term: string) {
    return this.estadoFuncionamientoService.findByTerm(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEstadoFuncionamientoDto: UpdateEstadoFuncionamientoDto,
  ) {
    return this.estadoFuncionamientoService.update(id, updateEstadoFuncionamientoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.estadoFuncionamientoService.remove(id);
  }
}