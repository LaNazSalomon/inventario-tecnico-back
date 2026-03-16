import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EquiposComputo } from '../entities/equipos-computo.entity';
import { Repository } from 'typeorm';
import { UtilsReportsService } from 'src/utils-reports/utils-reports.service';
import { buildComputoQuery } from '../helpers/queryBuilders/equipo-computo.query';
import { columnasComputo } from '../helpers/columnas-computo.helpers';

@Injectable()
export class ReportesComputoService {
  constructor(
    @InjectRepository(EquiposComputo)
    private readonly repo: Repository<EquiposComputo>,
    private readonly utilsReports: UtilsReportsService,
  ) {}

  async generarReportesTelefonicos(userId: string, res: Response) {
    const computadoras = await buildComputoQuery(this.repo, userId);

    const date = new Date().getTime();
    return this.utilsReports.generarReporteSimple(
      'Computo',
      columnasComputo,
      computadoras,
      res,
      `computo-${date}`,
    );
  }
}
