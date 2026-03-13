import * as XlsxPopulate from 'xlsx-populate';
import { Response } from 'express';

export class XlsxHelper {
  static async crearHoja(workbook: XlsxPopulate.Workbook, nombreHoja: string, columnas: string[], datos: any[]) {
    const sheet = workbook.addSheet(nombreHoja);

    // Encabezados
    columnas.forEach((col, i) => {
      sheet.cell(1, i + 1).value(col).style({ bold: true });
    });

    // Datos
    datos.forEach((row, rIndex) => {
      columnas.forEach((col, cIndex) => {
        sheet.cell(rIndex + 2, cIndex + 1).value(row[col]);
      });
    });

    return sheet;
  }

  static async exportar(workbook: XlsxPopulate.Workbook, res: Response, nombreArchivo: string) {
    const buffer = await workbook.outputAsync();
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', `attachment; filename=${nombreArchivo}.xlsx`);
    res.send(buffer);
  }
}