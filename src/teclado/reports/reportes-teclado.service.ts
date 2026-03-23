import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teclado } from '../entities/teclado.entity';
import { Repository } from 'typeorm';
import { UtilsReportsService } from 'src/utils-reports/utils-reports.service';
import { Response } from 'express';
import { buildTecladoQuery } from '../helpers/queryBuilders/build-teclado.query';
import { columnasTeclado } from '../helpers/columnas-teclado.helper';

@Injectable()
export class ReportesTecladoService {
  constructor(
    @InjectRepository(Teclado)
    private readonly repo: Repository<Teclado>,
    private readonly utilsReport: UtilsReportsService,
  ) {}

  async generarReporteTeclado(userId: string, res: Response) {
    const teclados = await buildTecladoQuery(this.repo, userId);

    const date = new Date().getTime();

    return this.utilsReport.generarReporteSimple(
      'Teclados',
      columnasTeclado,
      teclados,
      res,
      `Teclados-${date}`,
    );
  }
}
