import { Controller, Get, ParseUUIDPipe, Query, Res } from '@nestjs/common';
import { ReportesComputoService } from './reportes-computo.service';
import { Response } from 'express';
import { Auth } from 'src/users/decorators/auth.decorator';

@Controller('reportes/computo')
@Auth()
export class ReportesComputoController {
  constructor(private readonly computadorasSerivce: ReportesComputoService) {}

  @Get()
  async descargarReporte(
    @Query('usuarioId', ParseUUIDPipe) usuarioId: string,
    @Res() res: Response,
  ) {
    return this.computadorasSerivce.generarReportesTelefonicos(usuarioId, res);
  }
}
