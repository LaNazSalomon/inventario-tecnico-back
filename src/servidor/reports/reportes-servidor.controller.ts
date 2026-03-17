import { Controller, Get, ParseUUIDPipe, Query, Res } from "@nestjs/common";
import { Auth } from "src/users/decorators/auth.decorator";
import { ReportesServidorService } from "./reportes-servidor.service";
import { Response } from "express";

@Controller('reportes/servidores')
@Auth()
export class ReportesServidorController {
    constructor( private readonly reportesService: ReportesServidorService){}

    @Get()
    async descargarReporte(
        @Query('usuarioId', ParseUUIDPipe) userId: string,
        @Res() res: Response
    ){
        return this.reportesService.generarReporteServidor( userId, res );
    }
}