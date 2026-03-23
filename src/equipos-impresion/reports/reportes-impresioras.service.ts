import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipoImpresion } from '../entities/equipos-impresion.entity';
import { Repository } from 'typeorm';
import { UtilsReportsService } from 'src/utils-reports/utils-reports.service';
import { Response } from 'express';
import { buildImpresionQuery } from '../helpers/queryBuilders/build-impresion.query';
import { columnasImpresion } from '../helpers/columnas-impresion.helper';
import { dateGetTime } from 'src/common/helpers';

@Injectable()
export class ReportesImpresorasSerivce {
  constructor(
    @InjectRepository(EquipoImpresion)
    private readonly repo: Repository<EquipoImpresion>,
    private readonly utilsReport: UtilsReportsService,
  ) {}

  async generarReportesImpresion(userId: string, res: Response) {
    const impresoras = await buildImpresionQuery(this.repo, userId);

    return this.utilsReport.generarReporteSimple(
      'Impresoras',
      columnasImpresion,
      impresoras,
      res,
      `Impresoras-${dateGetTime}`,
    );
  }
}
