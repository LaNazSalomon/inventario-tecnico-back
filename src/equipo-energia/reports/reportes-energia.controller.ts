import { Controller, Get, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { ReportesEnergiaService } from './reportes-energia.service';
import { Auth } from 'src/users/decorators/auth.decorator';

@Controller('reportes/energia')
@Auth()
export class ReportesEnergiaController {
  constructor(private readonly reportesService: ReportesEnergiaService) {}

  @Get()
  async descargarReporte(
    @Query('usuarioId') usuarioId: string,
    @Res() res: Response,
  ) {
    return this.reportesService.generarReporteEnergia(usuarioId, res);
  }
}
