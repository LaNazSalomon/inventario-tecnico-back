import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UtilsReportsService } from 'src/utils-reports/utils-reports.service';
import { EquipoProyeccion } from '../entities/equipo-proyeccion.entity';

@Injectable()
export class ReportesProyectoresService {
  constructor(
    @InjectRepository(EquipoProyeccion)
    private readonly repo: Repository<EquipoProyeccion>,
    private readonly utilsReports: UtilsReportsService,
  ) {}

  async generarReporteProyectores(usuarioId: string, res: Response) {
    const proyectores = await this.repo
      .createQueryBuilder('ep')
      .innerJoin('ep.usuario', 'u')
      .innerJoin('ep.estadoFuncionamiento', 'ef')
      .innerJoin('ep.marcaEquipoProyeccion', 'me')
      .innerJoin('ep.modeloEquipoProyeccion', 'mo')
      .innerJoin('ep.unidadAcademica', 'ua')
      .innerJoin('ep.departamentoArea', 'd')
      .select([
        'ep."idEquipoProyeccion"',
        'ep.inventario AS inventario',
        'ep.serie AS serie',
        'ep.pulgadas AS pulgadas',
        'ep.resolucion AS resolucion',
        'ep."cantidadPuertosUsbA"',
        'ep."cantidadPuertosUsbB"',
        'ep."cantidadPuertosVga"',
        'ep."cantidadPuertosDvi"',
        'ep."cantidadPuertosHdmi"',
        'ep."cantidadPuertosRj45"',
        'ep."cantidadPuertosRca"',
        'ep."cantidadPuertosSuperVideo"',
        'ep."fechaVencimientoGarantia"',
        'ep."tipoEquipoProyeccion"',
        'ep."tipoPantalla"',
        'u."nombreEmpleado"',
        'ef."estado" AS estado_funcionamiento',
        'me."nombre" AS marca',
        'mo."nombre" AS modelo',
        'ua."nombreUnidad" AS unidad_academica',
        'd."nombreDepartamento" AS departamento',
      ])
      .where('u.idEmpleado = :usuarioId', { usuarioId })
      .getRawMany();

    const columnas = [
      'idEquipoProyeccion',
      'inventario',
      'serie',
      'pulgadas',
      'resolucion',
      'cantidadPuertosUsbA',
      'cantidadPuertosUsbB',
      'cantidadPuertosVga',
      'cantidadPuertosDvi',
      'cantidadPuertosHdmi',
      'cantidadPuertosRj45',
      'cantidadPuertosRca',
      'cantidadPuertosSuperVideo',
      'fechaVencimientoGarantia',
      'tipoEquipoProyeccion',
      'tipoPantalla',
      'nombreEmpleado',
      'estado_funcionamiento',
      'marca',
      'modelo',
      'unidad_academica',
      'departamento',
    ];

    const date = new Date().getTime();
    return this.utilsReports.generarReporteSimple(
      `Proyectores`,
      columnas,
      proyectores,
      res,
      `proyectores-${date}`,
    );
  }
}
