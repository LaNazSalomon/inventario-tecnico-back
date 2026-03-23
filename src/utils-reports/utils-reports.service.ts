import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as XlsxPopulate from 'xlsx-populate';
import { XlsxHelper } from './excel.helper';

@Injectable()
export class UtilsReportsService {
  async generarReporteSimple(
    nombreHoja: string,
    columnas: string[],
    datos: any[],
    res: Response,
    nombreArchivo: string,
  ) {
    const workbook = await XlsxPopulate.fromBlankAsync();
    XlsxHelper.crearHoja(workbook, nombreHoja, columnas, datos);
    return XlsxHelper.exportar(workbook, res, nombreArchivo);
  }

  async generarReporteMultiHojas(
    reportes: { nombreHoja: string; columnas: string[]; datos: any[] }[],
    res: Response,
    nombreArchivo: string,
  ) {
    const workbook = await XlsxPopulate.fromBlankAsync();
    reportes.forEach((r) => {
      XlsxHelper.crearHoja(workbook, r.nombreHoja, r.columnas, r.datos);
    });
    return XlsxHelper.exportar(workbook, res, nombreArchivo);
  }
}
