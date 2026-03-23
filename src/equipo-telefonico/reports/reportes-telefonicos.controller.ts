import { Controller, Get, ParseUUIDPipe, Query, Res } from '@nestjs/common';
import { ReportesTelefonicosService } from './reportes-telefonicos.service';
import { Response } from 'express';

@Controller('reportes/telefonicos')
export class ReportesTelefonicosController {
  constructor(private readonly reportesService: ReportesTelefonicosService) {}

  @Get()
  async descargarReporte(
    @Query('usuarioId', ParseUUIDPipe) usuarioId: string,
    @Res() res: Response,
  ) {
    return this.reportesService.generarReportesTelefonicos(usuarioId, res);
  }
}
