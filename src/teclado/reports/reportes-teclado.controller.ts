import { Controller, Get, ParseUUIDPipe, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { Auth } from 'src/users/decorators/auth.decorator';
import { ReportesTecladoService } from './reportes-teclado.service';

@Controller('reportes/teclados')
@Auth()
export class ReportesTecladoController {
  constructor(private readonly reportesService: ReportesTecladoService) {}


  @Get()
  async generarReporte(
    @Query('usuarioId', ParseUUIDPipe) usuarioId: string,
    @Res() res: Response,
  ) {
    return this.reportesService.generarReporteTeclado(usuarioId, res);
  }
}
