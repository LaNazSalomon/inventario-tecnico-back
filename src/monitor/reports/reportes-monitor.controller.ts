import { Controller, Get, ParseUUIDPipe, Query, Res } from '@nestjs/common';
import { Auth } from 'src/users/decorators/auth.decorator';
import { ReportesMonitorService } from './reportes-monitor.service';
import { Response } from 'express';

@Controller('reportes/monitores')
@Auth()
export class ReportesMonitorController {
  constructor(private readonly reportesService: ReportesMonitorService) {}

  @Get()
  async descargarReporte (
    @Query ('usuarioId', ParseUUIDPipe) usuarioId: string,
    @Res() res: Response,
  ) {
    return this.reportesService.generarReporteMonitor(usuarioId, res);
  }
}
