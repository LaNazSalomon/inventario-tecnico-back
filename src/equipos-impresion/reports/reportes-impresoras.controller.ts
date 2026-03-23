import { Controller, Get, ParseUUIDPipe, Query, Res } from '@nestjs/common';
import { ReportesImpresorasSerivce } from './reportes-impresioras.service';
import { Response } from 'express';
import { Auth } from 'src/users/decorators/auth.decorator';

@Controller('reportes/impresoras')
@Auth()
export class ReportesImpresorasController {
  constructor(private readonly reportesSerivce: ReportesImpresorasSerivce) {}

  @Get()
  async descargarReporte(
    @Query('usuarioId', ParseUUIDPipe) usuarioId: string,
    @Res() res: Response,
  ) {
    return this.reportesSerivce.generarReportesImpresion(usuarioId, res);
  }
}
