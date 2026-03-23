import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mouse } from '../entities/mouse.entity';
import { Repository } from 'typeorm';
import { UtilsReportsService } from 'src/utils-reports/utils-reports.service';
import { Response } from 'express';
import { buildMouseQuery } from '../helpers/queryBuilders/build-mouse.query';
import { columnasMouse } from '../helpers/columnas-mouse.helper';

@Injectable()
export class ReportesMousesService {
  constructor(
    @InjectRepository(Mouse)
    private readonly repo: Repository<Mouse>,
    private readonly utilsReport: UtilsReportsService,
  ) {}


  async generarReporteMouse( userId: string, res: Response){
    const mouses = await buildMouseQuery(this.repo, userId);

    const date = new Date().getTime();

    return this.utilsReport.generarReporteSimple(
        'Mouses',
        columnasMouse,
        mouses,
        res,
        `Mouses-${date}`
    );
  }
}

