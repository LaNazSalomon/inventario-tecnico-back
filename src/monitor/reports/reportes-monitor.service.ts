import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Monitor } from "../entities/monitor.entity";
import { Repository } from "typeorm";
import { UtilsReportsService } from "src/utils-reports/utils-reports.service";
import { Response } from "express";
import { buildMonitorQuery } from "../helpers/queryBuilders/build-monitor.query";
import { columnasMonitor } from "../helpers/columnas-monitor.helper";
import { dateGetTime } from "src/common/helpers";


@Injectable()
export class ReportesMonitorService {

    constructor(
        @InjectRepository( Monitor )
        private readonly repo: Repository<Monitor>,
        private readonly utilsReport: UtilsReportsService,
    ){}

    async generarReporteMonitor ( userId: string, res: Response) {
        const monitores = await buildMonitorQuery(this.repo, userId);

        const date = new Date().getTime();

        return this.utilsReport.generarReporteSimple(
            'Monitores',
            columnasMonitor,
            monitores,
            res,
            `Monitores-${date}`
        );
    }
}