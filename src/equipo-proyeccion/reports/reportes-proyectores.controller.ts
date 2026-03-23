import { Controller, Get, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { ReportesProyectoresService } from './reportes-proyectores.service';
import { Auth } from 'src/users/decorators/auth.decorator';

@Controller('reportes/proyectores')
export class ReportesController {
  constructor(private readonly reportesService: ReportesProyectoresService) {}

  @Get()
  @Auth()
  async descargarReporte(
    @Query('usuarioId') usuarioId: string,
    @Res() res: Response,
  ) {
    return this.reportesService.generarReporteProyectores(usuarioId, res);
  }
}