import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Servidor } from '../entities/servidor.entity';
import { Repository } from 'typeorm';
import { UtilsReportsService } from 'src/utils-reports/utils-reports.service';
import { Response } from 'express';
import { buildServidorQuery } from '../helpers/queryBuilders/build-servidor.query';
import { columnasServidor } from '../helpers/columnas-servidores.helper';

@Injectable()
export class ReportesServidorService {
  constructor(
    @InjectRepository(Servidor)
    private readonly repo: Repository<Servidor>,
    private readonly utilsReport: UtilsReportsService,
  ) {}

  async generarReporteServidor(userId: string, res: Response) {
    const servidores = await buildServidorQuery(this.repo, userId);

    const date = new Date().getTime();

    return this.utilsReport.generarReporteSimple(
      'Servidores',
      columnasServidor,
      servidores,
      res,
      `Servidores-${date}`,
    );
  }
}
