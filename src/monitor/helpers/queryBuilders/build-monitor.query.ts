import { Monitor } from 'src/monitor/entities/monitor.entity';
import { Repository } from 'typeorm';

export const buildMonitorQuery = (
  repo: Repository<Monitor>,
  userId: string,
) => {
  return repo
    .createQueryBuilder('m')
    .innerJoin('m.estado', 'ef')
    .innerJoin('m.empleado', 'u')
    .innerJoin('m.equipo', 'ec')
    .innerJoin('m.departamento', 'd')
    .innerJoin('m.unidadAcademica', 'ua')
    .select([
      'm."idMonitor" AS id',
      'm.numeroInventario AS numeroInventario',
      'm.marca AS marca',
      'm.modelo AS modelo',
      'm.pulgadas AS pulgadas',
      'm.resolucion AS resolucion',
      'm.tipoPantalla AS tipoPantalla',
      'm.cantidadPuertosVGA AS cantidadPuertosVGA',
      'm.cantidadPuertosDVI AS cantidadPuertosDVI',
      'm.cantidadPuertosHDMI AS cantidadPuertosHDMI',
      'm.serie AS serie',
      'm.fechaVencimientoGarantia AS fechaVencimientoGarantia',
      'ef."estado" AS estado_funcionamiento',
      'u."nombreEmpleado"',
      'ec."inventario" AS equipo_asignado',
      'd."nombreDepartamento" AS departamento',
      'ua."nombreUnidad" AS unidad_academica',
    ])
    .where('u."idEmpleado" = :usuarioId', { usuarioId: userId })
    .getRawMany();
};
