import { Controller, Get, ParseUUIDPipe, Query, Res } from '@nestjs/common';
import { Auth } from 'src/users/decorators/auth.decorator';
import { ReportesMousesService } from './reportes-mouse.service';
import { Response } from 'express';

@Controller('reportes/mouses')
@Auth()
export class ReportesMouseController {
  constructor(private readonly reportesService: ReportesMousesService) {}

 @Get()
 async descargarReporte(
    @Query('usuarioId', ParseUUIDPipe) usuarioId: string,
    @Res() res: Response
 ){
    return await this.reportesService.generarReporteMouse( usuarioId, res );
 }
}
