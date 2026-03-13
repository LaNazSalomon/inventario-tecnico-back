import { Controller, Get, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { ReportesAlmacenamientoService } from './reportes-almacenamiento.service';
import { Auth } from 'src/users/decorators/auth.decorator';

@Controller('reportes/almacenamiento')
@Auth()
export class ReportesAlmacenamientoController {
  constructor(
    private readonly reportesService: ReportesAlmacenamientoService,
  ) {}

  @Get()
  async descargarReporte(
    @Query('usuarioId') usuarioId: string,
    @Res() res: Response,
  ) {
    return this.reportesService.generarReporteAlmacenamiento(usuarioId, res);
  }
}
